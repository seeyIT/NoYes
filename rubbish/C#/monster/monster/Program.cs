using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monster
{
    class Program
    {
        static void Main(string[] args)
        {
            potw a1 = new potw(2);
            potw a2 = new potw(5);

            prze asd = new prze();

            asd.dip(a1);

            Console.WriteLine();
        }
    }

    class walka
    {
        void wlacz()
        {

        }
    }
    class prze
    {
        public void dip(potw pot)
        {
            pot.zycie--;
        }
    }
    class potw
    {
        public int zycie=2;

        public potw(int a)
        {
            zycie = a;
        }

        public void asd(int a)
        {
            zycie = a;
        }

    }


}
