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


namespace Komunikator
{
    public partial class Form1 : Form
    {
        private TcpListener _server;
        private TcpClient _client;
        
        public Form1()
        {
            InitializeComponent();
        }

        private void bt_Start_Click(object sender, EventArgs e)
        {

            bw_Connetion.RunWorkerAsync();
        }

        private void Server_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {

        }

        private void bw_Connetion_DoWork(object sender, DoWorkEventArgs e)
        {
            IPAddress adresIP = null;
            try
            {
                adresIP = IPAddress.Parse(input_IP.Text);
            }
            catch
            {
                MessageBox.Show("Blędny IP!");

                return;
            }
            int port = System.Convert.ToInt16(input_PORT.Value);

            try
            {
                _server = new TcpListener(adresIP, port);
                _server.Start();
                _client = _server.AcceptTcpClient();

                IPEndPoint IP = (IPEndPoint)_client.Client.RemoteEndPoint;

                bt_Start.Invoke(new MethodInvoker(delegate { bt_Start.Enabled = false; }));
                bt_Stop.Invoke(new MethodInvoker(delegate { bt_Stop.Enabled = false; }));
                
                //_client.Close();
                //_server.Stop();
            }
            catch(Exception exp)
            {
                MessageBox.Show("blad");
                MessageBox.Show(exp.Message);
            }
        }

        private void bt_Stop_Click(object sender, EventArgs e)
        {
            if (!bw_Connetion.IsBusy)
                return;

           bw_Connetion.CancelAsync();
        }
    }
}
