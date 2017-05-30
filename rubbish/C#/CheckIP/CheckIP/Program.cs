using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;

namespace CheckIP
{
    class Program
    {
        static void Main(string[] args)
        {
            int counter = 0;
            string hostName = Dns.GetHostName();
            IPHostEntry addressessIP = Dns.GetHostEntry(hostName);
            Console.WriteLine("host: " + hostName);
            
            foreach(IPAddress address in addressessIP.AddressList)
            {
                if(address.ToString() =="127.0.0.1")
                {
                    Console.WriteLine("IP: " + address.ToString());
                }
                else
                {
                    Console.WriteLine("ip" + ++counter + ": " + address.ToString());
                }
                Console.ReadLine();
            }
        }
    }
}
