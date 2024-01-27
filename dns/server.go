package main

// Inspired by https://github.com/tianon/rawdns

import (
	"flag"
	"log"
	"net"
	"os"
	"os/signal"
	"strings"

	"github.com/miekg/dns"
)

var (
	domain      = flag.String("domain", "local.ribbon.dev", "wildcard domain")
	domainIp    = flag.String("ip", "127.0.0.1", "where domain should resolve")
	nameservers = flag.String("nameservers", "8.8.8.8,8.8.4.4", "nameservers for forwarding")
)

func main() {
	flag.Parse()
	log.Printf("Serving %s->%s and forwarding rest to %s\n", *domain, *domainIp, *nameservers)

	dns.HandleFunc(*domain+".", func(w dns.ResponseWriter, req *dns.Msg) {
		m := new(dns.Msg)
		m.SetReply(req)
		m.Authoritative = true
		defer w.WriteMsg(m)

		for _, q := range req.Question {
			log.Printf("Resolve DNS query for %#v to %s", q.Name, *domainIp)
			m.Answer = append(m.Answer, &dns.A{
				A:   net.ParseIP(*domainIp),
				Hdr: dns.RR_Header{Name: q.Name, Class: q.Qclass, Ttl: 0, Rrtype: dns.TypeA},
			})
		}
	})

	dns.HandleFunc(".", func(w dns.ResponseWriter, req *dns.Msg) {
		for _, q := range req.Question {
			log.Printf("Forward DNS query for %#v", q.Name)
		}

		client := &dns.Client{Net: "udp", SingleInflight: true}

		for _, ns := range strings.Split(*nameservers, ",") {
			if r, _, err := client.Exchange(req, ns+":53"); err == nil {
				if r.Rcode == dns.RcodeSuccess {
					r.Compress = true
					w.WriteMsg(r)
					for _, a := range r.Answer {
						log.Printf("Answer from %s: %v\n", ns, a)
					}
					return
				}
			}
		}

		log.Println("failure to forward request")
		m := new(dns.Msg)
		m.SetReply(req)
		m.SetRcode(req, dns.RcodeServerFailure)
		w.WriteMsg(m)
	})

	go func() {
		sig := make(chan os.Signal)
		signal.Notify(sig, os.Interrupt, os.Kill)
		for {
			select {
			case s := <-sig:
				log.Fatalf("fatal: signal %s received\n", s)
			}
		}
	}()

	server := &dns.Server{Addr: ":53", Net: "udp", TsigSecret: nil}
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Failed to setup server: %v\n", err)
	}
}
