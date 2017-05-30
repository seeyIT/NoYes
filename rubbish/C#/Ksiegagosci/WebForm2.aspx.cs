using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Ksiegagosci
{
    public partial class WebForm2 : System.Web.UI.Page
    {
        private string _singleLine;
        private int _iterator = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            ReadFile();
        }

        private void ReadFile()
        {
            StreamReader streamReader = new StreamReader(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + @"\dane.txt");
            form1.Controls.Add(new Literal()
            {
                Text = "<table style='border:2px black solid' > "
            });
            while ((_singleLine = streamReader.ReadLine()) != null)
            {
                
                form1.Controls.Add(new Literal()
                {
                    Text = "<tr>"
                });
                
                string[] _splited = _singleLine.Split(' ');
                for(int i = 0;i<6; ++i)
                {
                    if (i == 0)
                    {
                        form1.Controls.Add(new Literal()
                        {
                            Text = "<td style='border:1px black solid'>Imie = " + _splited[0] + "</td>"
                        });
                    }
                    else if (i == 1)
                    {
                        form1.Controls.Add(new Literal()
                        {
                            Text = "<td style='border:1px black solid'>Nazwisko = " + _splited[1] + "</td>"
                        });
                    }
                    else if (i == 2)
                    {
                        form1.Controls.Add(new Literal()
                        {
                            Text = "<td style='border:1px black solid'>Email = " + _splited[2] + "</td>"
                        });
                    }
                    else if (i == 3)
                    {
                        form1.Controls.Add(new Literal()
                        {
                            Text = "<td style='border:1px black solid'>Data = " + _splited[3] + "</td>"
                        });
                    }
                    else if (i == 4)
                    {
                        form1.Controls.Add(new Literal()
                        {
                            Text = "<td style='border:1px black solid'>Kod pocztowy = " + _splited[4] + "</td>"
                        });
                    }
                    else if (i ==5)
                    {
                        form1.Controls.Add(new Literal()
                        {
                            Text = "<td style='border:1px black solid'>Telefon = " + _splited[5] + "</td>"
                        });
                    }
                    
                }
                
                
                form1.Controls.Add(new Literal()
                {
                    Text = "</tr>"
                });
                
            }
            form1.Controls.Add(new Literal()
            {
                Text = "</table > "
            });
            streamReader.Close();
            
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/WebForm1.aspx");
        }
    }
    
}