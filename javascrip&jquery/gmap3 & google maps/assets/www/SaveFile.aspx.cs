using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class SaveFile : System.Web.UI.Page
{
    string TXT_PATH = HttpContext.Current.Server.MapPath("Plik/test.txt");

    protected void Page_Load(object sender, EventArgs e)
    {
        string wycieczka = Request["wycieczka"];
        if (wycieczka == null)
        {
            Response.Write("wycieczka nie doszła");
        }
        else
        {
            SaveFileLocal(wycieczka);
            Response.Write("wycieczka zapisana");
        }
    }

    void SaveFileLocal(string wycieczka)
    {   
        StreamWriter s = new StreamWriter(TXT_PATH, true, System.Text.Encoding.Default);
        s.WriteLine(wycieczka+",");
        s.Close();
    }
}