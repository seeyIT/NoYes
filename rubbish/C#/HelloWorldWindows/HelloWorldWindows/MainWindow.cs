using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HelloWorldWindows
{
    public partial class fMainWindow : Form
    {
        public fMainWindow()
        {
            InitializeComponent();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void Submit_MouseClick(object sender, MouseEventArgs e)
        {
            Text = "Time " + DateTime.Now.ToLongTimeString().Replace(":","-");
            
            Answer.Text += tbInput.Text;
        }

        

        
    }
}
