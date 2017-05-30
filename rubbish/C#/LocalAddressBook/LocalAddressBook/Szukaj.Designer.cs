namespace LocalAddressBook
{
    partial class Szukaj
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
            this.bSzukaj = new System.Windows.Forms.Button();
            this.bAnuluj = new System.Windows.Forms.Button();
            this.cbNazwa = new System.Windows.Forms.CheckBox();
            this.cbNazwisko = new System.Windows.Forms.CheckBox();
            this.cbNRbuta = new System.Windows.Forms.CheckBox();
            this.tbNazwa = new System.Windows.Forms.TextBox();
            this.tbNazwisko = new System.Windows.Forms.TextBox();
            this.tbNRbuta = new System.Windows.Forms.TextBox();
            this.checkBox1 = new System.Windows.Forms.CheckBox();
            this.checkBox2 = new System.Windows.Forms.CheckBox();
            this.checkBox3 = new System.Windows.Forms.CheckBox();
            this.SuspendLayout();
            // 
            // bSzukaj
            // 
            this.bSzukaj.Location = new System.Drawing.Point(70, 194);
            this.bSzukaj.Name = "bSzukaj";
            this.bSzukaj.Size = new System.Drawing.Size(75, 23);
            this.bSzukaj.TabIndex = 0;
            this.bSzukaj.Text = "Szukaj";
            this.bSzukaj.UseVisualStyleBackColor = true;
            this.bSzukaj.Click += new System.EventHandler(this.bSzukaj_Click);
            // 
            // bAnuluj
            // 
            this.bAnuluj.Location = new System.Drawing.Point(170, 194);
            this.bAnuluj.Name = "bAnuluj";
            this.bAnuluj.Size = new System.Drawing.Size(75, 23);
            this.bAnuluj.TabIndex = 1;
            this.bAnuluj.Text = "Anuluj";
            this.bAnuluj.UseVisualStyleBackColor = true;
            this.bAnuluj.Click += new System.EventHandler(this.bAnuluj_Click);
            // 
            // cbNazwa
            // 
            this.cbNazwa.AutoSize = true;
            this.cbNazwa.Location = new System.Drawing.Point(70, 40);
            this.cbNazwa.Name = "cbNazwa";
            this.cbNazwa.Size = new System.Drawing.Size(59, 17);
            this.cbNazwa.TabIndex = 2;
            this.cbNazwa.Text = "Nazwa";
            this.cbNazwa.UseVisualStyleBackColor = true;
            this.cbNazwa.CheckedChanged += new System.EventHandler(this.checkBox1_CheckedChanged);
            // 
            // cbNazwisko
            // 
            this.cbNazwisko.AutoSize = true;
            this.cbNazwisko.Location = new System.Drawing.Point(67, 75);
            this.cbNazwisko.Name = "cbNazwisko";
            this.cbNazwisko.Size = new System.Drawing.Size(72, 17);
            this.cbNazwisko.TabIndex = 3;
            this.cbNazwisko.Text = "Nazwisko";
            this.cbNazwisko.UseVisualStyleBackColor = true;
            // 
            // cbNRbuta
            // 
            this.cbNRbuta.AutoSize = true;
            this.cbNRbuta.Location = new System.Drawing.Point(67, 122);
            this.cbNRbuta.Name = "cbNRbuta";
            this.cbNRbuta.Size = new System.Drawing.Size(63, 17);
            this.cbNRbuta.TabIndex = 4;
            this.cbNRbuta.Text = "NRbuta";
            this.cbNRbuta.UseVisualStyleBackColor = true;
            // 
            // tbNazwa
            // 
            this.tbNazwa.Location = new System.Drawing.Point(145, 40);
            this.tbNazwa.Name = "tbNazwa";
            this.tbNazwa.Size = new System.Drawing.Size(100, 20);
            this.tbNazwa.TabIndex = 5;
            // 
            // tbNazwisko
            // 
            this.tbNazwisko.Location = new System.Drawing.Point(145, 75);
            this.tbNazwisko.Name = "tbNazwisko";
            this.tbNazwisko.Size = new System.Drawing.Size(100, 20);
            this.tbNazwisko.TabIndex = 6;
            // 
            // tbNRbuta
            // 
            this.tbNRbuta.Location = new System.Drawing.Point(145, 119);
            this.tbNRbuta.Name = "tbNRbuta";
            this.tbNRbuta.Size = new System.Drawing.Size(100, 20);
            this.tbNRbuta.TabIndex = 7;
            // 
            // checkBox1
            // 
            this.checkBox1.AutoSize = true;
            this.checkBox1.Location = new System.Drawing.Point(13, 40);
            this.checkBox1.Name = "checkBox1";
            this.checkBox1.Size = new System.Drawing.Size(80, 17);
            this.checkBox1.TabIndex = 8;
            this.checkBox1.Text = "checkBox1";
            this.checkBox1.UseVisualStyleBackColor = true;
            // 
            // checkBox2
            // 
            this.checkBox2.AutoSize = true;
            this.checkBox2.Location = new System.Drawing.Point(13, 75);
            this.checkBox2.Name = "checkBox2";
            this.checkBox2.Size = new System.Drawing.Size(80, 17);
            this.checkBox2.TabIndex = 9;
            this.checkBox2.Text = "checkBox2";
            this.checkBox2.UseVisualStyleBackColor = true;
            // 
            // checkBox3
            // 
            this.checkBox3.AutoSize = true;
            this.checkBox3.Location = new System.Drawing.Point(13, 119);
            this.checkBox3.Name = "checkBox3";
            this.checkBox3.Size = new System.Drawing.Size(80, 17);
            this.checkBox3.TabIndex = 10;
            this.checkBox3.Text = "checkBox3";
            this.checkBox3.UseVisualStyleBackColor = true;
            // 
            // Szukaj
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Controls.Add(this.checkBox3);
            this.Controls.Add(this.checkBox2);
            this.Controls.Add(this.checkBox1);
            this.Controls.Add(this.tbNRbuta);
            this.Controls.Add(this.tbNazwisko);
            this.Controls.Add(this.tbNazwa);
            this.Controls.Add(this.cbNRbuta);
            this.Controls.Add(this.cbNazwisko);
            this.Controls.Add(this.cbNazwa);
            this.Controls.Add(this.bAnuluj);
            this.Controls.Add(this.bSzukaj);
            this.Name = "Szukaj";
            this.Text = "Szukaj";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button bSzukaj;
        private System.Windows.Forms.Button bAnuluj;
        private System.Windows.Forms.CheckBox cbNazwa;
        private System.Windows.Forms.CheckBox cbNazwisko;
        private System.Windows.Forms.CheckBox cbNRbuta;
        private System.Windows.Forms.TextBox tbNazwa;
        private System.Windows.Forms.TextBox tbNazwisko;
        private System.Windows.Forms.TextBox tbNRbuta;
        private System.Windows.Forms.CheckBox checkBox1;
        private System.Windows.Forms.CheckBox checkBox2;
        private System.Windows.Forms.CheckBox checkBox3;
    }
}