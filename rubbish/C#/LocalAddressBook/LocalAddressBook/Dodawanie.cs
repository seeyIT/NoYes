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

namespace LocalAddressBook
{
    public partial class Dodawanie : Form
    {
        public Form1 mainForm;

        public Dodawanie(Form1 mainF)
        {
            mainForm = mainF;
            InitializeComponent();
            
        }

        private void bAnuluj_Click(object sender, EventArgs e)
        {
            this.Hide();
        }

        private void bDodaj_Click(object sender, EventArgs e)
        {
            SqlConnection sqlConnection =
            new SqlConnection(global::LocalAddressBook.Properties.Settings.Default.AddressBookConnectionString);

            try
            {

                sqlConnection.Open();

                string sql = "INSERT INTO Person (Nazwa,Nazwisko,NRbuta) VALUES ('"+tbNazwa.Text+"','"+tbNazwisko.Text+"',"+tbNRbuta.Text+")";

                SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);

                sqlCommand.ExecuteNonQuery();
                MessageBox.Show("Done");
                mainForm.personTableAdapter.Fill(mainForm.addressBookDataSet1.Person);
                mainForm.ShowButtons();

                // Form1 form1 = new Form1();
                //form1.Show();

                //mainForm.personTableAdapter.Fill(mainForm.addressBookDataSet1.Person);

            }
            catch (Exception exp)
            {
                MessageBox.Show("err");
            }
            finally
            {
                sqlConnection.Close();
                mainForm.personTableAdapter.Fill(mainForm.addressBookDataSet1.Person);
                mainForm.ShowButtons();
            }
            mainForm.RefreshData();
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void tbNRbuta_TextChanged(object sender, EventArgs e)
        {

        }

        private void tbNazwisko_TextChanged(object sender, EventArgs e)
        {

        }

        private void tbNazwa_TextChanged(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void bAnuluj_Click_1(object sender, EventArgs e)
        {
            this.Hide();
        }
    }
}
