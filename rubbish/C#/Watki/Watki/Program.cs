using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;


namespace Watki
{
    class Program
    {
        private static void Method1(object o)
        {
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine(o.ToString());
            }
        }
        private  void Method1(string asd)
        {
            ;
        }

        private static void Method2()
        {
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine(Thread.CurrentThread.ManagedThreadId);
            }
        }

        static void Main(string[] args)
        {

            Thread t2 = new Thread(Method2);
            Thread t1 = new Thread(Method1);
            t2.Start();
            t1.Start("Dane dla wątki");
            Console.ReadKey();

        }
       
    }
}
