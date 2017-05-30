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
    public partial class Aktualizacja : Form
    {
        private string id;
        
        private Form1 mainForm1;
        private int row;
        public Aktualizacja(string _id,Form1 form1,int _row)
        {
            id = _id;
            row = _row;
            mainForm1 = form1;

            

            InitializeComponent();
            FillFileds();
        }

        void FillFileds()
        {

            tbNazwa.Text =  (mainForm1.dataGridView1.Rows[row].Cells[1].Value).ToString();
            tbNazwisko.Text =  (mainForm1.dataGridView1.Rows[row].Cells[2].Value).ToString();
            tbNRbuta.Text=  (mainForm1.dataGridView1.Rows[row].Cells[3].Value).ToString();



            
        }

        private void bAnuluj_Click(object sender, EventArgs e)
        {
            this.Hide();
        }

        private void bAktualizuj_Click(object sender, EventArgs e)
        {
            SqlConnection sqlConnection =
            new SqlConnection(global::LocalAddressBook.Properties.Settings.Default.AddressBookConnectionString);

            try
            {
                sqlConnection.Open();
//                UPDATE table_name
//SET column1 = value, column2 = value2,...
//WHERE some_column = some_value
                string sql = "UPDATE Person SET Nazwa = '"+ tbNazwa.Text + "', Nazwisko = '"+ tbNazwisko.Text + "', NRbuta= '" + tbNRbuta.Text + "' WHERE id = "+ Int32.Parse(id) + "";

                SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);

                sqlCommand.ExecuteNonQuery();
                MessageBox.Show("Done");
            }
            catch (Exception exp)
            {
                MessageBox.Show("err");
            }
            finally
            {
                sqlConnection.Close();
                mainForm1.personTableAdapter.Fill(mainForm1.addressBookDataSet1.Person);
            }
            mainForm1.RefreshData();
        }
    }
}
