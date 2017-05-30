using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Ksiegagosci
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void tbSend_Click(object sender, EventArgs e)
        {
            if (Page.IsValid)
            {
                
                StreamWriter streamWriter = new StreamWriter(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)+@"\dane.txt", true);
                streamWriter.Write(tbImie.Text+" ");
                streamWriter.Write(tbNazwisko.Text+" ");
                streamWriter.Write(tbEmail.Text+" ");
                streamWriter.Write(tbData.Text+" ");
                streamWriter.Write(tbKod.Text+" ");
                streamWriter.Write(tbTel.Text+" ");
                streamWriter.Write(Environment.NewLine);
                streamWriter.Close();
               
            }
            
        }

        protected void Check_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/WebForm2.aspx");
        }
    }
}