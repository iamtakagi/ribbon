package ntp.main;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Date;

public class Server {
    public static void main(String[] args) {
        try {
            DatagramSocket socket = new DatagramSocket(123);
            byte[] buf = new byte[48];
            DatagramPacket packet = new DatagramPacket(buf, buf.length);
            
            while (true) {
                socket.receive(packet);
                
                long currentTime = System.currentTimeMillis();
                byte[] ntpPacket = createNtpPacket(currentTime);
                
                InetAddress clientAddress = packet.getAddress();
                int clientPort = packet.getPort();
                DatagramPacket responsePacket = new DatagramPacket(ntpPacket, ntpPacket.length, clientAddress, clientPort);
                socket.send(responsePacket);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private static byte[] createNtpPacket(long currentTime) {
        byte[] ntpPacket = new byte[48];    
        return ntpPacket;
    }
}
