package main

import (
	"fmt"
	"net"

	"github.com/miekg/dns"
)

func main() {
	dns.HandleFunc(".", func(w dns.ResponseWriter, r *dns.Msg) {
		m := new(dns.Msg)
		m.SetReply(r)
		m.Authoritative = true

		for _, q := range m.Question {
			if q.Name == "local.ribbon.dev." && (q.Qtype == dns.TypeA || q.Qtype == dns.TypeAAAA) {
				rr := new(dns.A)
				rr.Hdr = dns.RR_Header{Name: q.Name, Rrtype: dns.TypeA, Class: dns.ClassINET, Ttl: 3600}
				rr.A = net.ParseIP("127.0.0.1")
				m.Answer = append(m.Answer, rr)

				rrv6 := new(dns.AAAA)
				rrv6.Hdr = dns.RR_Header{Name: q.Name, Rrtype: dns.TypeAAAA, Class: dns.ClassINET, Ttl: 3600}
				rrv6.AAAA = net.ParseIP("::1")
				m.Answer = append(m.Answer, rrv6)
			}
		}

		w.WriteMsg(m)
	})

	server := &dns.Server{Addr: ":53", Net: "udp"}
	fmt.Println("DNS server listening on :53")
	err := server.ListenAndServe()
	if err != nil {
		fmt.Println("Failed to start DNS server:", err)
	}
}
