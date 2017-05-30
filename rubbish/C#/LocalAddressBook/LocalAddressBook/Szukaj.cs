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
    public partial class Szukaj : Form
    {
        public Form1 mainForm;
        public Szukaj(Form1 form1)
        {
            mainForm = form1;
            InitializeComponent();
        }
        private SqlDataAdapter dataAdapter = new SqlDataAdapter();
        private BindingSource bindingSource1 = new BindingSource();

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void bAnuluj_Click(object sender, EventArgs e)
        {
            this.Hide();
        }

        private void bSzukaj_Click(object sender, EventArgs e)
        {
            SqlConnection sqlConnection =
            new SqlConnection(global::LocalAddressBook.Properties.Settings.Default.AddressBookConnectionString);

            try
            {
                string nazwa = "%";
                string nazwisko = "%";
                string nrbuta = "%";

                string and1 = "AND";
                string and2 = "AND";
                string and3 = "AND";

                if (checkBox1.Checked)
                {
                    and1 = "OR";
                }

                if (checkBox2.Checked)
                {
                    and2 = "OR";
                }

                if (checkBox1.Checked)
                {
                    and2 = "OR";
                }

                sqlConnection.Open();
                if (cbNazwa.Checked)
                {
                    nazwa = "%" + tbNazwa.Text+"%";
                }
                if (cbNazwisko.Checked)
                {
                    nazwisko = "%" + tbNazwisko.Text + "%";
                }
                if (cbNRbuta.Checked)
                {
                    nrbuta = "%" + tbNRbuta.Text + "%";
                }


                //string sql = "INSERT INTO Person (Nazwa,Nazwisko,NRbuta) VALUES ('" + tbNazwa.Text + "','" + tbNazwisko.Text + "'," + tbNRbuta.Text + ")";
                string sql = "SELECT * FROM Person WHERE Nazwa LIKE '"+ nazwa + "' "+ and1 + " Nazwisko LIKE '"+nazwisko+"' "+and2and2+" NRbuta LIKE '"+nrbuta+"';";
                //string sql = "SELECT * FROM Person WHERE ";
                //SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);

                // sqlCommand.ExecuteNonQuery();

                mainForm.dataGridView1.DataSource = bindingSource1;
                GetData(sql, sqlConnection);
                MessageBox.Show("Done");
                mainForm.personTableAdapter.Fill(mainForm.addressBookDataSet1.Person);

                // Form1 form1 = new Form1();
                //form1.Show();
                mainForm.ShowButtons();
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

            }

           //mainForm.RefreshData();

    }

        private void GetData(string selectCommand, SqlConnection sqlConnection)
        {
            try
            {
                dataAdapter = new SqlDataAdapter(selectCommand, sqlConnection);

                SqlCommandBuilder commandBuilder = new SqlCommandBuilder(dataAdapter);

                DataTable table = new DataTable();

                table.Locale = System.Globalization.CultureInfo.InvariantCulture;
                dataAdapter.Fill(table);
                bindingSource1.DataSource = table;


            }
            catch (SqlException exp)
            {
                MessageBox.Show(exp.Message);
            }
        }



    }
}
