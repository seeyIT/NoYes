using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using System.Runtime.CompilerServices;
using Microsoft.Win32;




namespace TimeForBreak
{
    public partial class form1 : Form
    {
        private RegistryKey reg = Registry.CurrentUser.OpenSubKey("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
            true);

        private Timer _time = new Timer();
        private bool _toolBarState = false;
        private int _minutes;
        private int _secounds;
        private string _zeroIfIsNeeded = "";
        private MessageBox myBox;
        Form f = new Form();

        //private MessageBox myBox = new MessageBox(this,"Przerwa <3");
        public form1()
        {
            MakeBreakForm();
            reg.SetValue("TimeForBreak",Application.ExecutablePath.ToString());
            reg.Close();
            InitializeComponent();
            _minutes = 0;
            _secounds = 1;
            ShowTime();
            _time.Interval = 1000; 
            _time.Tick += new EventHandler(timer_Tick);
            _time.Start();
            lbTimer.Font = new Font("Arial", 36, FontStyle.Bold);
            this.MaximizeBox = false;
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
        }


        private void MakeBreakForm()
        {
            //Form a = new Form {TopMost = false, BackColor = Color.Black};

            //MessageBox.Show( a, "PRZERWA <3");
            f.Width = 170;
            f.Height = 100;
            f.Text = "<3";
            f.StartPosition = FormStartPosition.CenterScreen;
            f.FormBorderStyle = FormBorderStyle.Fixed3D;
            f.MaximizeBox = false;
            f.MinimizeBox = false;
            f.Closing += BreakFinished;
            Label l = new Label();
            l.Text = "PRZERWA <3";
            l.SetBounds(50, 10, 170, 50);
            l.ForeColor = Color.Gray;
            //l.Visible = true;
            //l.Show();
            Button b = new Button();
            b.SetBounds(50, 30, 70, 20);

            b.Text = "TAK";
            // b.Show();
            b.ForeColor = Color.Gray;
            //b.AutoSize = true;
            f.BackColor = Color.Black;
            b.Click += BreakFinished;
            f.Controls.Add(b);

            f.Controls.Add(l);
        }
        private void timer_Tick(object sender, EventArgs e)
        {
            --_secounds;
            if (_secounds <= 0)
            {
                if (_minutes <=0)
                {
                    _time.Stop();
                    _time.Enabled = false;
                    ShowTime();
                     f.Show();

                    _minutes = 60;
                    _time.Start();
                }
                else
                {
                    --_minutes;
                    _secounds = 59;
                }
            }
            ShowTime();

        }

        private void BreakFinished(object sender, EventArgs e)
        {
            _minutes = 60;
            _secounds = 0;
            f.Hide();

        }
        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            if (this.WindowState == FormWindowState.Minimized)
            {
                this.ShowInTaskbar = _toolBarState;

                notifyIcon2.Icon = SystemIcons.Application;
                //notifyIcon2.BalloonTipText = "Tak";
                //notifyIcon2.ShowBalloonTip(1000);
                notifyIcon2.Visible = true;

            }
            else if (WindowState == FormWindowState.Normal)
            {
                this.ShowInTaskbar = _toolBarState;

            }
        }

        private void notifyIcon2_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            WindowState = FormWindowState.Normal;
        }

        private void btToolBar_Click(object sender, EventArgs e)
        {
            _toolBarState = !_toolBarState;
            if (_toolBarState)
            {
                lbToolBar.Text = "Obecnie jest ikonka :)";
            }
            else
            {
                lbToolBar.Text = "Obecnie nie ma ikonki :)";

            }
        }

        private void btSet60_Click(object sender, EventArgs e)
        {
            _minutes = 60;
            _secounds = 0;
            _time.Start();
            ShowTime();

        }

        private void btSet45_Click(object sender, EventArgs e)
        {
            _minutes = 45;
            _secounds = 0;
            _time.Start();
            ShowTime();
        }

        private void ShowTime()
        {
            if (_secounds < 10)
            {
                _zeroIfIsNeeded = "0";
            }
            lbTimer.Text = _minutes + " : " + _zeroIfIsNeeded + _secounds;
            _zeroIfIsNeeded = "";
        }

    }
}
