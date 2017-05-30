namespace HelloWorldWindows
{
    partial class fMainWindow
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
            this.Answer = new System.Windows.Forms.Label();
            this.tbInput = new System.Windows.Forms.TextBox();
            this.Enter = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // Answer
            // 
            this.Answer.AutoSize = true;
            this.Answer.Location = new System.Drawing.Point(73, 167);
            this.Answer.Name = "Answer";
            this.Answer.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.Answer.Size = new System.Drawing.Size(52, 13);
            this.Answer.TabIndex = 0;
            this.Answer.Text = "No czesc";
            
            // 
            // tbInput
            // 
            this.tbInput.Location = new System.Drawing.Point(73, 72);
            this.tbInput.Name = "tbInput";
            this.tbInput.Size = new System.Drawing.Size(100, 20);
            this.tbInput.TabIndex = 1;
            this.tbInput.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // Enter
            // 
            this.Enter.Location = new System.Drawing.Point(73, 119);
            this.Enter.Name = "Enter";
            this.Enter.Size = new System.Drawing.Size(75, 23);
            this.Enter.TabIndex = 2;
            this.Enter.Text = "Submit";
            this.Enter.UseVisualStyleBackColor = true;                      
            this.Enter.MouseClick += new System.Windows.Forms.MouseEventHandler(this.Submit_MouseClick);
            // 
            // fMainWindow
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(329, 270);
            this.Controls.Add(this.Enter);
            this.Controls.Add(this.tbInput);
            this.Controls.Add(this.Answer);
            this.Name = "fMainWindow";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label Answer;
        private System.Windows.Forms.TextBox tbInput;
        private System.Windows.Forms.Button Enter;
    }
}

