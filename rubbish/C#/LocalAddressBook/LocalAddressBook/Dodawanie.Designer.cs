namespace LocalAddressBook
{
    partial class Dodawanie
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.bDodaj = new System.Windows.Forms.Button();
            this.bAnuluj = new System.Windows.Forms.Button();
            this.tbNazwa = new System.Windows.Forms.TextBox();
            this.tbNazwisko = new System.Windows.Forms.TextBox();
            this.tbNRbuta = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // bDodaj
            // 
            this.bDodaj.Location = new System.Drawing.Point(48, 172);
            this.bDodaj.Name = "bDodaj";
            this.bDodaj.Size = new System.Drawing.Size(75, 23);
            this.bDodaj.TabIndex = 0;
            this.bDodaj.Text = "Dodaj";
            this.bDodaj.UseVisualStyleBackColor = true;
            this.bDodaj.Click += new System.EventHandler(this.bDodaj_Click);
            // 
            // bAnuluj
            // 
            this.bAnuluj.Location = new System.Drawing.Point(160, 172);
            this.bAnuluj.Name = "bAnuluj";
            this.bAnuluj.Size = new System.Drawing.Size(75, 23);
            this.bAnuluj.TabIndex = 1;
            this.bAnuluj.Text = "Anuluj";
            this.bAnuluj.UseVisualStyleBackColor = true;
            this.bAnuluj.Click += new System.EventHandler(this.bAnuluj_Click_1);
            // 
            // tbNazwa
            // 
            this.tbNazwa.Location = new System.Drawing.Point(99, 30);
            this.tbNazwa.Name = "tbNazwa";
            this.tbNazwa.Size = new System.Drawing.Size(100, 20);
            this.tbNazwa.TabIndex = 3;
            this.tbNazwa.TextChanged += new System.EventHandler(this.tbNazwa_TextChanged);
            // 
            // tbNazwisko
            // 
            this.tbNazwisko.Location = new System.Drawing.Point(99, 80);
            this.tbNazwisko.Name = "tbNazwisko";
            this.tbNazwisko.Size = new System.Drawing.Size(100, 20);
            this.tbNazwisko.TabIndex = 4;
            this.tbNazwisko.TextChanged += new System.EventHandler(this.tbNazwisko_TextChanged);
            // 
            // tbNRbuta
            // 
            this.tbNRbuta.Location = new System.Drawing.Point(99, 122);
            this.tbNRbuta.Name = "tbNRbuta";
            this.tbNRbuta.Size = new System.Drawing.Size(100, 20);
            this.tbNRbuta.TabIndex = 5;
            this.tbNRbuta.TextChanged += new System.EventHandler(this.tbNRbuta_TextChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(45, 36);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(40, 13);
            this.label1.TabIndex = 6;
            this.label1.Text = "Nazwa";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(37, 80);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(53, 13);
            this.label2.TabIndex = 7;
            this.label2.Text = "Nazwisko";
            this.label2.Click += new System.EventHandler(this.label2_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(37, 125);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(44, 13);
            this.label3.TabIndex = 8;
            this.label3.Text = "NRbuta";
            this.label3.Click += new System.EventHandler(this.label3_Click);
            // 
            // Dodawanie
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(355, 250);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.tbNRbuta);
            this.Controls.Add(this.tbNazwisko);
            this.Controls.Add(this.tbNazwa);
            this.Controls.Add(this.bAnuluj);
            this.Controls.Add(this.bDodaj);
            this.Name = "Dodawanie";
            this.Text = "Dodawanie";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.Button bDodaj;
        private System.Windows.Forms.Button bAnuluj;
        private System.Windows.Forms.TextBox tbNazwa;
        private System.Windows.Forms.TextBox tbNazwisko;
        private System.Windows.Forms.TextBox tbNRbuta;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
    }
}