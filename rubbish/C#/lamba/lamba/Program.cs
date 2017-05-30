using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lambda
{
    delegate bool D();
    delegate bool D2(int i);

    class Program
    {
        D del;
        D2 del2;
        public void TestMethod(int input)
        {
            int j = 0;
            del = () => { j = 10; return j > input; };
            del2 = (x) => { return x == j; };
            Console.WriteLine("j = {0}", j);
            bool boolResult = del();

            Console.WriteLine("j = {0}. b = {1}", j, boolResult);
        }

        static void Main()
        {
            Program test = new Program();
            test.TestMethod(5);
            bool results = test.del2(10);
            Console.WriteLine(results);
            Console.ReadKey();
        }
    }
}