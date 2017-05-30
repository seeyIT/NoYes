using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;

namespace ProjektKoncowy
{
    public partial class LoginPage : System.Web.UI.Page
    {
        private MySqlConnection _sqlConnection;
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        protected void loginB_Click(object sender, EventArgs e)
        {
            bool loginAble = passwordTB.Text != null && loginB !=null;
            if (!loginAble)
            {
                Response.Write("wpisz cos tam");
                return;
            }
            string login = loginTB.Text;

            string myConnection =
               "SERVER=localhost;" +
               "DATABASE=ProjektKoncowy;" +
               "UID=root;" +
               "PASSWORD=;";
            _sqlConnection = new MySqlConnection(myConnection);
            MySqlCommand cmd = _sqlConnection.CreateCommand();
            cmd.CommandText = "SELECT password FROM users WHERE login='"+ login + "';";
            MySqlDataReader reader;


            try
            {
                _sqlConnection.Open();
                reader = cmd.ExecuteReader();
                if (!reader.HasRows)
                {
                    Response.Write("zle haslo lub login");
                    return;
                }
                reader.Read();
                string password = reader.GetString(0);
                string hashPassword = Hash.HashPassword(passwordTB.Text);

                if (hashPassword == password)
                {
                    Response.Write("zalogowanie");
                }
                else
                {
                    Response.Write("zle haslozle haslo lub login");

                }

                Response.Write(hashPassword);
                //Response.Write(mode);

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