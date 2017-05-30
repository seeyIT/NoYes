using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Sockets;
using System.Net;
using System.Threading;
using System.Threading.Tasks;


namespace Local_Host_Port_Scaner
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            bt_Stop.Enabled = false;
        }

        TcpListener server;

        private Thread _scanPort;
        private int _state=0;


        private void Scan(object o)
        {
            if (LB1.InvokeRequired ||label1.InvokeRequired)
            {

                
                if (NUD1.Value > NUD2.Value)
                {
                    MessageBox.Show("Invalid port range");
                    return;
                }
                
                LB1.Invoke(new MethodInvoker(delegate { LB1.Items.Add("Start the scan..."); }));
                



                for (int i = (int)NUD1.Value; i <= (int)NUD2.Value; i++)
                {

                    this.Invoke(new MethodInvoker(delegate { this.Refresh(); }));
                    

                    label1.Invoke(new MethodInvoker(delegate { label1.Text = "Currently, the port scan: " + i; }));
                   
                    try
                    {
                        server = new TcpListener(IPAddress.Loopback, i);
                        server.Start();
                        server.Stop();
                    }

                    catch
                    {
                        LB1.Invoke(new MethodInvoker(delegate { LB1.Items.Add("Port " + i + " is busy"); }));
                        
                    }
                }
                LB1.Invoke(new MethodInvoker(delegate { LB1.Items.Add("Scan complited"); }));
              
            }
        }


        private void bt1_Click(object sender, EventArgs e)
        {
            
            if (_state==0)
            {
                LB1.Invoke(new MethodInvoker(delegate { LB1.Items.Clear(); }));
                _scanPort = new Thread(Scan);
                _scanPort.Start();
                bt1.Text = "Pause";
                _state = 1;
                LB1.Text = "";
                bt_Stop.Enabled = true;
            }
            else if(_state==1)
            {
                _scanPort.Suspend();
                bt1.Text = "Resume";
                _state = 2;
                bt_Stop.Enabled = false;
            }
            else if(_state==2)
            {
                _scanPort.Resume();
                bt1.Text = "Pause";
                bt_Stop.Enabled = true;
                _state = 1;
            }
        }

        private void bt_Click(object sender, EventArgs e)
        {
            _scanPort.Abort();
            bt1.Text = "Start";
            
            _state = 0;
            bt_Stop.Enabled = false;
            
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void LB1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
