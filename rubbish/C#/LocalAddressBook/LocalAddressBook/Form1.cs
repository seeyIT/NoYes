using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LocalAddressBook
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public int rows = 0;
        private SqlDataAdapter dataAdapter = new SqlDataAdapter();
        private BindingSource bindingSource1 = new BindingSource();

        private void Form1_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'addressBookDataSet1.Person' table. You can move, or remove it, as needed.
            this.personTableAdapter.Fill(this.addressBookDataSet1.Person);
            // TODO: This line of code loads data into the 'addressBookDataSet.Person' table. You can move, or remove it, as needed.
            //this.personTableAdapter.Fill(this.addressBookDataSet.Person);

        }

        private void button1_Click(object sender, EventArgs e)
        {
            SqlConnection sqlConnection =
            new SqlConnection(global::LocalAddressBook.Properties.Settings.Default.AddressBookConnectionString);

            try
            {
                
                sqlConnection.Open();
               
                string sql = "INSERT INTO Person (Nazwa,Nazwisko,NRbuta) VALUES ('asd','qwe','3')";
                
                SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
                
                sqlCommand.ExecuteNonQuery();
                //MessageBox.Show("Done");
                dataGridView1.DataSource = bindingSource1;
                GetData("select * from Person",sqlConnection);
                ShowButtons();
            }
            catch (Exception exp)
            {
                MessageBox.Show("err");
            }
            finally
            {
                sqlConnection.Close();

                this.personTableAdapter.Fill(this.addressBookDataSet1.Person);
            }
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


        private void bSzukaj_Click(object sender, EventArgs e)
        {
            Szukaj szukaj = new Szukaj(this);
            szukaj.Show();
        }

        private void bAdd_Click(object sender, EventArgs e)
        {
            Dodawanie dodawanie = new Dodawanie(this);
            dodawanie.Show();
        }
        List<Button> buttons = new List<Button>();
        public void ShowButtons(int scrollbarPos = 0)
        {


            foreach (var button in buttons)
            {
                this.Controls.Remove(button);
            }

            rows = dataGridView1.RowCount-1;
            int rows2 = rows;
            int foo = scrollbarPos/22;
            if (rows > 5)
            {
                rows = 5;
            }
            if (rows2 - foo == 4 && rows2>7)
            {
                rows = 4;
            }
            

            //MessageBox.Show((rows * 22 - scrollbarPos).ToString());



            for (int i = 0; i < rows; i++)
            {
                Button deleteButton = new Button();
                deleteButton.Left = 500;
                deleteButton.Top = 90+i*25;
                deleteButton.Text = "Usun";
                deleteButton.Name = (dataGridView1.Rows[i].Cells[0].Value).ToString();
                this.Controls.Add(deleteButton);
                deleteButton.Click += (s, e) => { DeleteRecord(deleteButton.Name); };

                buttons.Add(deleteButton);

                Button updateButton = new Button();
                updateButton.Left = 600;
                updateButton.Top = 90 + i * 25;
                updateButton.Name = (dataGridView1.Rows[i].Cells[0].Value).ToString();
                updateButton.Text = "Aktualizacja";
                updateButton.Click += (s, e) =>
                {
                    Aktualizacja aktualizacja =
                    new Aktualizacja(updateButton.Name,this, (updateButton.Top -90) /25);
                    aktualizacja.Show();
                };

                this.Controls.Add(updateButton);
                buttons.Add(updateButton);
            }
        }

        public void DeleteRecord(string id)
        {
            SqlConnection sqlConnection =
            new SqlConnection(global::LocalAddressBook.Properties.Settings.Default.AddressBookConnectionString);

            try
            {

                sqlConnection.Open();

                string sql = "DELETE FROM Person WHERE id = "+ Int32.Parse(id);

                SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);

                sqlCommand.ExecuteNonQuery();
                //MessageBox.Show("Done");
                dataGridView1.DataSource = bindingSource1;
                GetData("select * from Person", sqlConnection);
                ShowButtons();
            }
            catch (Exception exp)
            {
                MessageBox.Show("err");
            }
            finally
            {
                sqlConnection.Close();

                this.personTableAdapter.Fill(this.addressBookDataSet1.Person);
            }
        }

        private void dataGridView1_Scroll(object sender, ScrollEventArgs e)
        {
            //MessageBox.Show("err");
            string msg = String.Format("Row: {0}, Column: {1}",
            dataGridView1.Rows[1].Cells[0].Value,
            dataGridView1.VerticalScrollingOffset);
            //MessageBox.Show(msg);
            ShowButtons(dataGridView1.VerticalScrollingOffset);
        }

        public void RefreshData()
        {
            SqlConnection sqlConnection =
            new SqlConnection(global::LocalAddressBook.Properties.Settings.Default.AddressBookConnectionString);

            try
            {

                sqlConnection.Open();
               
                dataGridView1.DataSource = bindingSource1;
                GetData("select * from Person", sqlConnection);
            }
            catch (Exception exp)
            {
                MessageBox.Show("err");
            }
            finally
            {
                sqlConnection.Close();

                this.personTableAdapter.Fill(this.addressBookDataSet1.Person);
                ShowButtons();

            }

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        
    }
}
