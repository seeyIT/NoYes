namespace TimeForBreak
{
    partial class form1
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
            this.notifyIcon2 = new System.Windows.Forms.NotifyIcon(this.components);
            this.btToolBar = new System.Windows.Forms.Button();
            this.lbToolBar = new System.Windows.Forms.Label();
            this.lbTimer = new System.Windows.Forms.Label();
            this.btSet60 = new System.Windows.Forms.Button();
            this.btSet45 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // notifyIcon2
            // 
            this.notifyIcon2.Text = "notifyIcon2";
            this.notifyIcon2.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.notifyIcon2_MouseDoubleClick);
            // 
            // btToolBar
            // 
            this.btToolBar.BackColor = System.Drawing.SystemColors.InfoText;
            this.btToolBar.Location = new System.Drawing.Point(34, 297);
            this.btToolBar.Name = "btToolBar";
            this.btToolBar.Size = new System.Drawing.Size(75, 23);
            this.btToolBar.TabIndex = 0;
            this.btToolBar.Text = "Tool Bar";
            this.btToolBar.UseVisualStyleBackColor = false;
            this.btToolBar.Click += new System.EventHandler(this.btToolBar_Click);
            // 
            // lbToolBar
            // 
            this.lbToolBar.AutoSize = true;
            this.lbToolBar.Location = new System.Drawing.Point(165, 302);
            this.lbToolBar.Name = "lbToolBar";
            this.lbToolBar.Size = new System.Drawing.Size(110, 13);
            this.lbToolBar.TabIndex = 1;
            this.lbToolBar.Text = "Obecnie jest ikonka :)";
            // 
            // lbTimer
            // 
            this.lbTimer.Location = new System.Drawing.Point(-5, 86);
            this.lbTimer.Name = "lbTimer";
            this.lbTimer.Size = new System.Drawing.Size(291, 150);
            this.lbTimer.TabIndex = 2;
            this.lbTimer.Text = "00 : 00";
            this.lbTimer.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btSet60
            // 
            this.btSet60.BackColor = System.Drawing.SystemColors.InfoText;
            this.btSet60.Location = new System.Drawing.Point(34, 37);
            this.btSet60.Name = "btSet60";
            this.btSet60.Size = new System.Drawing.Size(75, 23);
            this.btSet60.TabIndex = 3;
            this.btSet60.Text = "60 minut";
            this.btSet60.UseVisualStyleBackColor = false;
            this.btSet60.Click += new System.EventHandler(this.btSet60_Click);
            // 
            // btSet45
            // 
            this.btSet45.BackColor = System.Drawing.SystemColors.InfoText;
            this.btSet45.ForeColor = System.Drawing.SystemColors.ButtonShadow;
            this.btSet45.Location = new System.Drawing.Point(168, 37);
            this.btSet45.Name = "btSet45";
            this.btSet45.Size = new System.Drawing.Size(75, 23);
            this.btSet45.TabIndex = 4;
            this.btSet45.Text = "45 minut";
            this.btSet45.UseVisualStyleBackColor = false;
            this.btSet45.Click += new System.EventHandler(this.btSet45_Click);
            // 
            // form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.WindowText;
            this.ClientSize = new System.Drawing.Size(284, 332);
            this.Controls.Add(this.btSet45);
            this.Controls.Add(this.btSet60);
            this.Controls.Add(this.lbTimer);
            this.Controls.Add(this.lbToolBar);
            this.Controls.Add(this.btToolBar);
            this.ForeColor = System.Drawing.SystemColors.ButtonShadow;
            this.Name = "form1";
            this.Text = "LOREM IPSUM :)";
            this.SizeChanged += new System.EventHandler(this.Form1_SizeChanged);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.NotifyIcon notifyIcon2;
        private System.Windows.Forms.Button btToolBar;
        private System.Windows.Forms.Label lbToolBar;
        private System.Windows.Forms.Label lbTimer;
        private System.Windows.Forms.Button btSet60;
        private System.Windows.Forms.Button btSet45;
    }
}

