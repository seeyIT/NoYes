using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using Microsoft.ApplicationInsights.DataContracts;

namespace guess
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string uo = Application.Get("usersOnline").ToString();
            string ut = Application.Get("usersTotal").ToString();
            usersOnline.Text = uo;
            usersTotal.Text = ut;
        }

        private void AddXmlContent(XmlDocument doc, XmlElement element,
            string tag, string value)
        {
            XmlElement newXmlElement = doc.CreateElement(tag);
            XmlText xmlText = doc.CreateTextNode(value);
            element.AppendChild(newXmlElement);
            newXmlElement.AppendChild(xmlText);
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            if (Page.IsValid)
            {
                XmlDocument document = new XmlDocument();
                document.Load(Server.MapPath("bok.xml"));
                XmlElement newElement;
                newElement = document.CreateElement("guest");
                document.DocumentElement.PrependChild(newElement);
                AddXmlContent(document,newElement,"name",tbName.Text);
                AddXmlContent(document,newElement,"emial",tbEmail.Text);
                AddXmlContent(document,newElement,"inscription",tbInscription.Text);
                document.Save(Server.MapPath("bok.xml"));

            }
        }
    }
}