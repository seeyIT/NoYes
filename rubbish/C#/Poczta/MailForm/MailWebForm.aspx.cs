using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.Net;
using System.Collections;
using System.IO;

namespace MailForm
{
    public partial class MailWebForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void bSend_Click(object sender, EventArgs e)
        {
            SmtpClient client;
            MailMessage message;
            ArrayList attachmentList = new ArrayList();

            try
            {
                message = new MailMessage(tbFrom.Text, tbTo.Text);
                message.Subject = tbSubject.Text;
                message.Body = tbText.Text;
                client = new SmtpClient(tbSMTP.Text);
                client.Credentials = CredentialCache.DefaultNetworkCredentials;
                for (int i = 0; i < lbAttach.Items.Count; i++)
                {
                    Attachment attachment = new Attachment(Server.MapPath("~/") + lbAttach.Items[i].ToString());
                    message.Attachments.Add(attachment);
                    attachmentList.Add(attachment);
                }
                client.Send(message);
                lInfo1.Text = "Message sent";
                for (int j = 0; j < attachmentList.Count; j++)
                {
                    ((Attachment)attachmentList[j]).Dispose();
                }
                for (int i = 0; i < lbAttach.Items.Count; i++)
                {
                    File.Delete(Server.MapPath("~/") + lbAttach.Items[i].ToString());
                }
                lbAttach.Items.Clear();
            }
            catch(Exception ex)
            {
                lInfo1.Text = "You cannot send message (" + ex.Message + ")";
            }
        }

        protected void bClear_Click(object sender, EventArgs e)
        {
            tbFrom.Text = "";
            tbTo.Text = "";
            tbSubject.Text = "";
            tbText.Text = "";
            tbSMTP.Text = "";
            lInfo1.Text = "";
            lbAttach.Items.Clear();
        }

        protected void bSave_Click(object sender, EventArgs e)
        {
            if (FileUpload1.HasFile)
            {
                string fileName = FileUpload1.FileName;
                string serverPath = Server.MapPath("~/") + fileName;
                FileUpload1.SaveAs(serverPath);
                lbAttach.Items.Add(fileName);
                lInfo2.Text = "Attachment downloaded";
            }
        }
    }
}