namespace Komunikator
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
            this.bt_Stop = new System.Windows.Forms.Button();
            this.TextDisplay = new System.Windows.Forms.ListBox();
            this.label1 = new System.Windows.Forms.Label();
            this.input_PORT = new System.Windows.Forms.NumericUpDown();
            this.input_IP = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.bt_Start = new System.Windows.Forms.Button();
            this.bw_Connetion = new System.ComponentModel.BackgroundWorker();
            ((System.ComponentModel.ISupportInitialize)(this.input_PORT)).BeginInit();
            this.SuspendLayout();
            // 
            // bt_Stop
            // 
            this.bt_Stop.Location = new System.Drawing.Point(219, 192);
            this.bt_Stop.Name = "bt_Stop";
            this.bt_Stop.Size = new System.Drawing.Size(75, 23);
            this.bt_Stop.TabIndex = 1;
            this.bt_Stop.Text = "Stop";
            this.bt_Stop.UseVisualStyleBackColor = true;
            this.bt_Stop.Click += new System.EventHandler(this.bt_Stop_Click);
            // 
            // TextDisplay
            // 
            this.TextDisplay.FormattingEnabled = true;
            this.TextDisplay.Location = new System.Drawing.Point(42, 73);
            this.TextDisplay.Name = "TextDisplay";
            this.TextDisplay.Size = new System.Drawing.Size(345, 95);
            this.TextDisplay.TabIndex = 2;
            this.TextDisplay.SelectedIndexChanged += new System.EventHandler(this.Server_SelectedIndexChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(39, 34);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(45, 13);
            this.label1.TabIndex = 3;
            this.label1.Text = "Address";
            // 
            // input_PORT
            // 
            this.input_PORT.Location = new System.Drawing.Point(267, 35);
            this.input_PORT.Name = "input_PORT";
            this.input_PORT.Size = new System.Drawing.Size(120, 20);
            this.input_PORT.TabIndex = 4;
            this.input_PORT.ValueChanged += new System.EventHandler(this.numericUpDown1_ValueChanged);
            // 
            // input_IP
            // 
            this.input_IP.Location = new System.Drawing.Point(99, 34);
            this.input_IP.Name = "input_IP";
            this.input_IP.Size = new System.Drawing.Size(100, 20);
            this.input_IP.TabIndex = 5;
            this.input_IP.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(216, 42);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(26, 13);
            this.label2.TabIndex = 6;
            this.label2.Text = "Port";
            // 
            // bt_Start
            // 
            this.bt_Start.Location = new System.Drawing.Point(113, 192);
            this.bt_Start.Name = "bt_Start";
            this.bt_Start.Size = new System.Drawing.Size(75, 23);
            this.bt_Start.TabIndex = 7;
            this.bt_Start.Text = "Start";
            this.bt_Start.UseVisualStyleBackColor = true;
            this.bt_Start.Click += new System.EventHandler(this.bt_Start_Click);
            // 
            // bw_Connetion
            // 
            this.bw_Connetion.WorkerSupportsCancellation = true;
            this.bw_Connetion.DoWork += new System.ComponentModel.DoWorkEventHandler(this.bw_Connetion_DoWork);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(429, 279);
            this.Controls.Add(this.bt_Start);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.input_IP);
            this.Controls.Add(this.input_PORT);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.TextDisplay);
            this.Controls.Add(this.bt_Stop);
            this.Name = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.input_PORT)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Button bt_Stop;
        private System.Windows.Forms.ListBox TextDisplay;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.NumericUpDown input_PORT;
        private System.Windows.Forms.TextBox input_IP;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button bt_Start;
        private System.ComponentModel.BackgroundWorker bw_Connetion;
    }
}

