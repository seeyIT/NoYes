namespace LocalAddressBook
{
    partial class Aktualizacja
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
            this.bAktualizuj = new System.Windows.Forms.Button();
            this.bAnuluj = new System.Windows.Forms.Button();
            this.tbNazwa = new System.Windows.Forms.TextBox();
            this.tbNazwisko = new System.Windows.Forms.TextBox();
            this.tbNRbuta = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // bAktualizuj
            // 
            this.bAktualizuj.Location = new System.Drawing.Point(71, 187);
            this.bAktualizuj.Name = "bAktualizuj";
            this.bAktualizuj.Size = new System.Drawing.Size(75, 23);
            this.bAktualizuj.TabIndex = 0;
            this.bAktualizuj.Text = "Aktualizuj";
            this.bAktualizuj.UseVisualStyleBackColor = true;
            this.bAktualizuj.Click += new System.EventHandler(this.bAktualizuj_Click);
            // 
            // bAnuluj
            // 
            this.bAnuluj.Location = new System.Drawing.Point(177, 187);
            this.bAnuluj.Name = "bAnuluj";
            this.bAnuluj.Size = new System.Drawing.Size(75, 23);
            this.bAnuluj.TabIndex = 1;
            this.bAnuluj.Text = "Anuluj";
            this.bAnuluj.UseVisualStyleBackColor = true;
            this.bAnuluj.Click += new System.EventHandler(this.bAnuluj_Click);
            // 
            // tbNazwa
            // 
            this.tbNazwa.Location = new System.Drawing.Point(113, 43);
            this.tbNazwa.Name = "tbNazwa";
            this.tbNazwa.Size = new System.Drawing.Size(100, 20);
            this.tbNazwa.TabIndex = 2;
            // 
            // tbNazwisko
            // 
            this.tbNazwisko.Location = new System.Drawing.Point(113, 80);
            this.tbNazwisko.Name = "tbNazwisko";
            this.tbNazwisko.Size = new System.Drawing.Size(100, 20);
            this.tbNazwisko.TabIndex = 3;
            // 
            // tbNRbuta
            // 
            this.tbNRbuta.Location = new System.Drawing.Point(113, 126);
            this.tbNRbuta.Name = "tbNRbuta";
            this.tbNRbuta.Size = new System.Drawing.Size(100, 20);
            this.tbNRbuta.TabIndex = 4;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(35, 43);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(40, 13);
            this.label1.TabIndex = 5;
            this.label1.Text = "Nazwa";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(38, 86);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(53, 13);
            this.label2.TabIndex = 6;
            this.label2.Text = "Nazwisko";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(41, 132);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(44, 13);
            this.label3.TabIndex = 7;
            this.label3.Text = "NRbuta";
            // 
            // Aktualizacja
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.tbNRbuta);
            this.Controls.Add(this.tbNazwisko);
            this.Controls.Add(this.tbNazwa);
            this.Controls.Add(this.bAnuluj);
            this.Controls.Add(this.bAktualizuj);
            this.Name = "Aktualizacja";
            this.Text = "Aktualizacja";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button bAktualizuj;
        private System.Windows.Forms.Button bAnuluj;
        private System.Windows.Forms.TextBox tbNazwa;
        private System.Windows.Forms.TextBox tbNazwisko;
        private System.Windows.Forms.TextBox tbNRbuta;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
    }
}