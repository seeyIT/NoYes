using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegat
{
    class Program
    {
        
        delegate int Delegat_1(int x, int y);
        delegate void Delegat_2(string x);
        delegate int Delegat_3(int x);

        static int Suma(int x, int y)
        {
            return x + y;
        }

        static int Roznica(int x, int y)
        {
            return x - y;
        }

        static int Bin(int x, int y, Delegat_1 nowyDelegat)
        {
            return x + y + nowyDelegat(50, 60);
        }

        static void Main(string[] args)
        {
            Delegat_1 delegat_1 = new Delegat_1(Suma);
            Console.WriteLine("Dodawanie 50+50" + delegat_1(50, 50));
            delegat_1 = Roznica;
            Console.WriteLine("Odejmowanie 30-20" + delegat_1(30, 20));

            Delegat_2 delegat_2 = delegate (string M)
            {
                Console.WriteLine(M);
            };
            delegat_2("Hello World");

            Delegat_3 delegat_3 = x => x * x;
            int j = delegat_3(5);
            Console.WriteLine("{0}", j);
            Console.WriteLine("{0}", Bin(2, 6, delegat_1));
            Console.ReadLine();
        }
    }
}