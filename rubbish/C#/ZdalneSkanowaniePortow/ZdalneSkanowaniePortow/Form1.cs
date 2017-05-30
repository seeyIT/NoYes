using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using System.Net.Sockets;

namespace ZdalneSkanowaniePortow
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            short[] PortList = { 20, 21, 22, 23, 25, 53, 70, 80, 109, 110, 119, 143, 161, 162, 443, 3389 };
            string host = tB1.Text;
            Scanner.Items.Add("Skanowanie portów dla " + host);
            Scanner.Items.Add("Tom może chwile potrwać...");
            foreach (short port in PortList)
            {
                this.Refresh();
                try
                {
                    TcpClient client = new TcpClient(host, port);
                    Scanner.Items.Add("Port " + port.ToString() + " jest otwarty");
                }
                catch
                {
                    Scanner.Items.Add("Port " + port.ToString() + " jest zamknięty");
                }
            }
        }


    }
}
