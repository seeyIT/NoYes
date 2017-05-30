using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;

namespace ProjektKoncowy
{
    public partial class RegisterPage : System.Web.UI.Page
    {
        private MySqlConnection _sqlConnection;

        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void registerB_Click(object sender, EventArgs e)
        {
            string login = loginTB.Text;
            string password1 = passwordTB1.Text;
            string password2 = passwordTB2.Text;

            if (password2 != password1)
            {
                Response.Write("passwords are different");
                return;
            }
            try
            {
                string myConnection =
                        "SERVER=localhost;" +
                        "DATABASE=ProjektKoncowy;" +
                        "UID=root;" +
                        "PASSWORD=;";

                _sqlConnection = new MySqlConnection(myConnection);
                MySqlCommand cmd = _sqlConnection.CreateCommand();
                cmd.CommandText = "SELECT login FROM users WHERE login='" + login + "';";
                MySqlDataReader reader;

            
                _sqlConnection.Open();
                reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    Response.Write("zly login taki user istnieje");
                    return;
                }
                reader.Close();
                MySqlCommand cmd2 = _sqlConnection.CreateCommand();
                string hashPassword = Hash.HashPassword(password2);
                cmd.CommandText = "INSERT INTO `users` (`login`,`password`,mode)" +
                                  " VALUES ('" + login + "','" + hashPassword + "',1);";
                MySqlDataReader reader2;
                reader2 = cmd.ExecuteReader();
                reader2.Close();
            }
            catch (Exception exp)
            {
                Response.Write(exp.Message);
                Response.Write("raczej nie ");
            }
            finally
            {
                _sqlConnection.Close();
            }

        }

        
    }
}