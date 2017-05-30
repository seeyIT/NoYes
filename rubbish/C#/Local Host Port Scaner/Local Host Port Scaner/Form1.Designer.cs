namespace Local_Host_Port_Scaner
{
    partial class Form1
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
            this.bt1 = new System.Windows.Forms.Button();
            this.NUD1 = new System.Windows.Forms.NumericUpDown();
            this.NUD2 = new System.Windows.Forms.NumericUpDown();
            this.label1 = new System.Windows.Forms.Label();
            this.LB1 = new System.Windows.Forms.ListBox();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.bt_Stop = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.NUD1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.NUD2)).BeginInit();
            this.SuspendLayout();
            // 
            // bt1
            // 
            this.bt1.Location = new System.Drawing.Point(12, 39);
            this.bt1.Name = "bt1";
            this.bt1.Size = new System.Drawing.Size(75, 23);
            this.bt1.TabIndex = 0;
            this.bt1.Text = "Run";
            this.bt1.UseVisualStyleBackColor = true;
            this.bt1.Click += new System.EventHandler(this.bt1_Click);
            // 
            // NUD1
            // 
            this.NUD1.Location = new System.Drawing.Point(13, 13);
            this.NUD1.Maximum = new decimal(new int[] {
            65536,
            0,
            0,
            0});
            this.NUD1.Name = "NUD1";
            this.NUD1.Size = new System.Drawing.Size(120, 20);
            this.NUD1.TabIndex = 1;
            // 
            // NUD2
            // 
            this.NUD2.Location = new System.Drawing.Point(152, 12);
            this.NUD2.Maximum = new decimal(new int[] {
            65536,
            0,
            0,
            0});
            this.NUD2.Name = "NUD2";
            this.NUD2.Size = new System.Drawing.Size(120, 20);
            this.NUD2.TabIndex = 2;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(89, 64);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(116, 13);
            this.label1.TabIndex = 3;
            this.label1.Text = "Currently, the port scan";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // LB1
            // 
            this.LB1.BackColor = System.Drawing.SystemColors.Window;
            this.LB1.FormattingEnabled = true;
            this.LB1.Location = new System.Drawing.Point(12, 80);
            this.LB1.Name = "LB1";
            this.LB1.Size = new System.Drawing.Size(260, 173);
            this.LB1.TabIndex = 4;
            this.LB1.SelectedIndexChanged += new System.EventHandler(this.LB1_SelectedIndexChanged);
            // 
            // bt_Stop
            // 
            this.bt_Stop.Location = new System.Drawing.Point(207, 39);
            this.bt_Stop.Name = "bt_Stop";
            this.bt_Stop.Size = new System.Drawing.Size(75, 23);
            this.bt_Stop.TabIndex = 5;
            this.bt_Stop.Text = "Stop";
            this.bt_Stop.UseVisualStyleBackColor = true;
            this.bt_Stop.Click += new System.EventHandler(this.bt_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(384, 325);
            this.Controls.Add(this.bt_Stop);
            this.Controls.Add(this.LB1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.NUD2);
            this.Controls.Add(this.NUD1);
            this.Controls.Add(this.bt1);
            this.Name = "Form1";
            this.Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.NUD1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.NUD2)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button bt1;
        private System.Windows.Forms.NumericUpDown NUD1;
        private System.Windows.Forms.NumericUpDown NUD2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ListBox LB1;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private System.Windows.Forms.Button bt_Stop;
    }
}

