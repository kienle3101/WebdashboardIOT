namespace SmartHouseWinform
{
    partial class MainFrom
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
            this.grbUserInfo = new System.Windows.Forms.GroupBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.grbComConnection = new System.Windows.Forms.GroupBox();
            this.label5 = new System.Windows.Forms.Label();
            this.tbtnDisconnect = new System.Windows.Forms.Button();
            this.btnConnect = new System.Windows.Forms.Button();
            this.cboComPort = new System.Windows.Forms.ComboBox();
            this.label4 = new System.Windows.Forms.Label();
            this.grbDeviceControl = new System.Windows.Forms.GroupBox();
            this.grpDoor = new System.Windows.Forms.GroupBox();
            this.button5 = new System.Windows.Forms.Button();
            this.button6 = new System.Windows.Forms.Button();
            this.label8 = new System.Windows.Forms.Label();
            this.grpFan = new System.Windows.Forms.GroupBox();
            this.button3 = new System.Windows.Forms.Button();
            this.button4 = new System.Windows.Forms.Button();
            this.label7 = new System.Windows.Forms.Label();
            this.grpLight = new System.Windows.Forms.GroupBox();
            this.button2 = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.label6 = new System.Windows.Forms.Label();
            this.grpSystemStatus = new System.Windows.Forms.GroupBox();
            this.label11 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.grpRecentLogs = new System.Windows.Forms.GroupBox();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.colTime = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colUser = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colDevice = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colAction = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colResult = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.grbUserInfo.SuspendLayout();
            this.grbComConnection.SuspendLayout();
            this.grbDeviceControl.SuspendLayout();
            this.grpDoor.SuspendLayout();
            this.grpFan.SuspendLayout();
            this.grpLight.SuspendLayout();
            this.grpSystemStatus.SuspendLayout();
            this.grpRecentLogs.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // grbUserInfo
            // 
            this.grbUserInfo.Controls.Add(this.label3);
            this.grbUserInfo.Controls.Add(this.label2);
            this.grbUserInfo.Controls.Add(this.label1);
            this.grbUserInfo.Location = new System.Drawing.Point(12, 12);
            this.grbUserInfo.Name = "grbUserInfo";
            this.grbUserInfo.Size = new System.Drawing.Size(272, 135);
            this.grbUserInfo.TabIndex = 0;
            this.grbUserInfo.TabStop = false;
            this.grbUserInfo.Text = "User Information\n";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(24, 101);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(139, 16);
            this.label3.TabIndex = 2;
            this.label3.Text = "API Status: Connected";
            this.label3.Click += new System.EventHandler(this.label3_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(24, 67);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(80, 16);
            this.label2.TabIndex = 1;
            this.label2.Text = "Role: USER";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(24, 28);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(113, 16);
            this.label1.TabIndex = 0;
            this.label1.Text = "Username: admin";
            // 
            // grbComConnection
            // 
            this.grbComConnection.Controls.Add(this.label5);
            this.grbComConnection.Controls.Add(this.tbtnDisconnect);
            this.grbComConnection.Controls.Add(this.btnConnect);
            this.grbComConnection.Controls.Add(this.cboComPort);
            this.grbComConnection.Controls.Add(this.label4);
            this.grbComConnection.Location = new System.Drawing.Point(297, 17);
            this.grbComConnection.Name = "grbComConnection";
            this.grbComConnection.Size = new System.Drawing.Size(272, 297);
            this.grbComConnection.TabIndex = 1;
            this.grbComConnection.TabStop = false;
            this.grbComConnection.Text = " COM Connection";
            this.grbComConnection.Enter += new System.EventHandler(this.grbComConnection_Enter);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(18, 234);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(133, 16);
            this.label5.TabIndex = 4;
            this.label5.Text = "Status: Disconnected";
            this.label5.Click += new System.EventHandler(this.label5_Click);
            // 
            // tbtnDisconnect
            // 
            this.tbtnDisconnect.Location = new System.Drawing.Point(105, 147);
            this.tbtnDisconnect.Name = "tbtnDisconnect";
            this.tbtnDisconnect.Size = new System.Drawing.Size(75, 35);
            this.tbtnDisconnect.TabIndex = 3;
            this.tbtnDisconnect.Text = "Disconnect";
            this.tbtnDisconnect.UseVisualStyleBackColor = true;
            // 
            // btnConnect
            // 
            this.btnConnect.Location = new System.Drawing.Point(21, 147);
            this.btnConnect.Name = "btnConnect";
            this.btnConnect.Size = new System.Drawing.Size(75, 35);
            this.btnConnect.TabIndex = 2;
            this.btnConnect.Text = "Connect";
            this.btnConnect.UseVisualStyleBackColor = true;
            this.btnConnect.Click += new System.EventHandler(this.btnConnect_Click);
            // 
            // cboComPort
            // 
            this.cboComPort.FormattingEnabled = true;
            this.cboComPort.Location = new System.Drawing.Point(21, 88);
            this.cboComPort.Name = "cboComPort";
            this.cboComPort.Size = new System.Drawing.Size(121, 24);
            this.cboComPort.TabIndex = 1;
            this.cboComPort.SelectedIndexChanged += new System.EventHandler(this.cboComPort_SelectedIndexChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(18, 48);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(64, 16);
            this.label4.TabIndex = 0;
            this.label4.Text = "COM Port";
            this.label4.Click += new System.EventHandler(this.label4_Click);
            // 
            // grbDeviceControl
            // 
            this.grbDeviceControl.Controls.Add(this.grpDoor);
            this.grbDeviceControl.Controls.Add(this.grpFan);
            this.grbDeviceControl.Controls.Add(this.grpLight);
            this.grbDeviceControl.Location = new System.Drawing.Point(12, 351);
            this.grbDeviceControl.Name = "grbDeviceControl";
            this.grbDeviceControl.Size = new System.Drawing.Size(531, 190);
            this.grbDeviceControl.TabIndex = 2;
            this.grbDeviceControl.TabStop = false;
            this.grbDeviceControl.Text = " Device Control";
            // 
            // grpDoor
            // 
            this.grpDoor.Controls.Add(this.button5);
            this.grpDoor.Controls.Add(this.button6);
            this.grpDoor.Controls.Add(this.label8);
            this.grpDoor.Location = new System.Drawing.Point(371, 42);
            this.grpDoor.Name = "grpDoor";
            this.grpDoor.Size = new System.Drawing.Size(160, 128);
            this.grpDoor.TabIndex = 2;
            this.grpDoor.TabStop = false;
            this.grpDoor.Text = "Door";
            // 
            // button5
            // 
            this.button5.Location = new System.Drawing.Point(16, 77);
            this.button5.Name = "button5";
            this.button5.Size = new System.Drawing.Size(73, 26);
            this.button5.TabIndex = 8;
            this.button5.Text = "Close";
            this.button5.UseVisualStyleBackColor = true;
            // 
            // button6
            // 
            this.button6.Location = new System.Drawing.Point(16, 48);
            this.button6.Name = "button6";
            this.button6.Size = new System.Drawing.Size(75, 26);
            this.button6.TabIndex = 7;
            this.button6.Text = "Open";
            this.button6.UseVisualStyleBackColor = true;
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(16, 29);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(61, 16);
            this.label8.TabIndex = 6;
            this.label8.Text = "CLOSED";
            // 
            // grpFan
            // 
            this.grpFan.Controls.Add(this.button3);
            this.grpFan.Controls.Add(this.button4);
            this.grpFan.Controls.Add(this.label7);
            this.grpFan.Location = new System.Drawing.Point(195, 42);
            this.grpFan.Name = "grpFan";
            this.grpFan.Size = new System.Drawing.Size(160, 128);
            this.grpFan.TabIndex = 1;
            this.grpFan.TabStop = false;
            this.grpFan.Text = "Fan";
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(6, 77);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(73, 26);
            this.button3.TabIndex = 5;
            this.button3.Text = "Turn OFF";
            this.button3.UseVisualStyleBackColor = true;
            // 
            // button4
            // 
            this.button4.Location = new System.Drawing.Point(6, 48);
            this.button4.Name = "button4";
            this.button4.Size = new System.Drawing.Size(75, 26);
            this.button4.TabIndex = 4;
            this.button4.Text = "Turn ON";
            this.button4.UseVisualStyleBackColor = true;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(6, 29);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(76, 16);
            this.label7.TabIndex = 3;
            this.label7.Text = "Status: OFF";
            // 
            // grpLight
            // 
            this.grpLight.Controls.Add(this.button2);
            this.grpLight.Controls.Add(this.button1);
            this.grpLight.Controls.Add(this.label6);
            this.grpLight.Location = new System.Drawing.Point(18, 42);
            this.grpLight.Name = "grpLight";
            this.grpLight.Size = new System.Drawing.Size(160, 128);
            this.grpLight.TabIndex = 0;
            this.grpLight.TabStop = false;
            this.grpLight.Text = " Room Light";
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(6, 77);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(73, 26);
            this.button2.TabIndex = 2;
            this.button2.Text = "Turn OFF";
            this.button2.UseVisualStyleBackColor = true;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(6, 48);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 26);
            this.button1.TabIndex = 1;
            this.button1.Text = "Turn ON";
            this.button1.UseVisualStyleBackColor = true;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(6, 29);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(76, 16);
            this.label6.TabIndex = 0;
            this.label6.Text = "Status: OFF";
            // 
            // grpSystemStatus
            // 
            this.grpSystemStatus.Controls.Add(this.label11);
            this.grpSystemStatus.Controls.Add(this.label10);
            this.grpSystemStatus.Controls.Add(this.label9);
            this.grpSystemStatus.Location = new System.Drawing.Point(30, 191);
            this.grpSystemStatus.Name = "grpSystemStatus";
            this.grpSystemStatus.Size = new System.Drawing.Size(185, 123);
            this.grpSystemStatus.TabIndex = 3;
            this.grpSystemStatus.TabStop = false;
            this.grpSystemStatus.Text = "System Status ";
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(24, 85);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(110, 16);
            this.label11.TabIndex = 2;
            this.label11.Text = "DOOR : CLOSED";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(24, 60);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(69, 16);
            this.label10.TabIndex = 1;
            this.label10.Text = "FAN : OFF";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(24, 37);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(81, 16);
            this.label9.TabIndex = 0;
            this.label9.Text = "LIGHT : OFF";
            // 
            // grpRecentLogs
            // 
            this.grpRecentLogs.Controls.Add(this.dataGridView1);
            this.grpRecentLogs.Location = new System.Drawing.Point(575, 17);
            this.grpRecentLogs.Name = "grpRecentLogs";
            this.grpRecentLogs.Size = new System.Drawing.Size(762, 515);
            this.grpRecentLogs.TabIndex = 4;
            this.grpRecentLogs.TabStop = false;
            this.grpRecentLogs.Text = "Recent Logs";
            // 
            // dataGridView1
            // 
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.colTime,
            this.colUser,
            this.colDevice,
            this.colAction,
            this.colResult});
            this.dataGridView1.Location = new System.Drawing.Point(44, 39);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowHeadersWidth = 51;
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.Size = new System.Drawing.Size(678, 440);
            this.dataGridView1.TabIndex = 0;
            // 
            // colTime
            // 
            this.colTime.HeaderText = "Time";
            this.colTime.MinimumWidth = 6;
            this.colTime.Name = "colTime";
            this.colTime.Width = 125;
            // 
            // colUser
            // 
            this.colUser.HeaderText = "User";
            this.colUser.MinimumWidth = 6;
            this.colUser.Name = "colUser";
            this.colUser.Width = 125;
            // 
            // colDevice
            // 
            this.colDevice.HeaderText = "Device";
            this.colDevice.MinimumWidth = 6;
            this.colDevice.Name = "colDevice";
            this.colDevice.Width = 125;
            // 
            // colAction
            // 
            this.colAction.HeaderText = "Action";
            this.colAction.MinimumWidth = 6;
            this.colAction.Name = "colAction";
            this.colAction.Width = 125;
            // 
            // colResult
            // 
            this.colResult.HeaderText = "Result";
            this.colResult.MinimumWidth = 6;
            this.colResult.Name = "colResult";
            this.colResult.Width = 125;
            // 
            // MainFrom
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1365, 553);
            this.Controls.Add(this.grpRecentLogs);
            this.Controls.Add(this.grpSystemStatus);
            this.Controls.Add(this.grbDeviceControl);
            this.Controls.Add(this.grbComConnection);
            this.Controls.Add(this.grbUserInfo);
            this.Name = "MainFrom";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Smart House Control";
            this.Load += new System.EventHandler(this.MainFrom_Load);
            this.grbUserInfo.ResumeLayout(false);
            this.grbUserInfo.PerformLayout();
            this.grbComConnection.ResumeLayout(false);
            this.grbComConnection.PerformLayout();
            this.grbDeviceControl.ResumeLayout(false);
            this.grpDoor.ResumeLayout(false);
            this.grpDoor.PerformLayout();
            this.grpFan.ResumeLayout(false);
            this.grpFan.PerformLayout();
            this.grpLight.ResumeLayout(false);
            this.grpLight.PerformLayout();
            this.grpSystemStatus.ResumeLayout(false);
            this.grpSystemStatus.PerformLayout();
            this.grpRecentLogs.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox grbUserInfo;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.GroupBox grbComConnection;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Button tbtnDisconnect;
        private System.Windows.Forms.Button btnConnect;
        private System.Windows.Forms.ComboBox cboComPort;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.GroupBox grbDeviceControl;
        private System.Windows.Forms.GroupBox grpDoor;
        private System.Windows.Forms.GroupBox grpFan;
        private System.Windows.Forms.GroupBox grpLight;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Button button3;
        private System.Windows.Forms.Button button4;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Button button5;
        private System.Windows.Forms.Button button6;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.GroupBox grpSystemStatus;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.GroupBox grpRecentLogs;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn colTime;
        private System.Windows.Forms.DataGridViewTextBoxColumn colUser;
        private System.Windows.Forms.DataGridViewTextBoxColumn colDevice;
        private System.Windows.Forms.DataGridViewTextBoxColumn colAction;
        private System.Windows.Forms.DataGridViewTextBoxColumn colResult;
    }
}