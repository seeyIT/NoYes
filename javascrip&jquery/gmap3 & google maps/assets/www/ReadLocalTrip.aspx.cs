using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;

public partial class ReadLocalTrip : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AppendHeader("Access-Control-Allow-Origin", "*");

        string TXT_PATH = HttpContext.Current.Server.MapPath("Plik/test.txt");
        StreamReader reader = new StreamReader(TXT_PATH, Encoding.Default);
        string all = reader.ReadToEnd();
        string retTabs = "[" + all.Substring(0, all.Length - 3) + "]";         
        reader.Close();
        Response.Write(retTabs);
    }
}