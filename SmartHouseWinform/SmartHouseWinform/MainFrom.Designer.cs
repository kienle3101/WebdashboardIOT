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
            this.pnlSidebar = new System.Windows.Forms.Panel();
            this.btnLogout = new System.Windows.Forms.Button();
            this.lblApiStatus = new System.Windows.Forms.Label();
            this.lblRole = new System.Windows.Forms.Label();
            this.lblUsername = new System.Windows.Forms.Label();
            this.pnlHeader = new System.Windows.Forms.Panel();
            this.lblHeaderSubtitle = new System.Windows.Forms.Label();
            this.lblHeaderTitle = new System.Windows.Forms.Label();
            this.pnlMain = new System.Windows.Forms.Panel();
            this.grpDeviceControl = new System.Windows.Forms.GroupBox();
            this.grpDoor = new System.Windows.Forms.GroupBox();
            this.btnDoorClose = new System.Windows.Forms.Button();
            this.btnDoorOpen = new System.Windows.Forms.Button();
            this.lblDoorStatus = new System.Windows.Forms.Label();
            this.lblDoorTitle = new System.Windows.Forms.Label();
            this.grpFan = new System.Windows.Forms.GroupBox();
            this.btnFanOff = new System.Windows.Forms.Button();
            this.btnFanOn = new System.Windows.Forms.Button();
            this.lblFanStatus = new System.Windows.Forms.Label();
            this.lblFanTitle = new System.Windows.Forms.Label();
            this.grpLight = new System.Windows.Forms.GroupBox();
            this.btnLightOff = new System.Windows.Forms.Button();
            this.btnLightOn = new System.Windows.Forms.Button();
            this.lblLightStatus = new System.Windows.Forms.Label();
            this.lblLightTitle = new System.Windows.Forms.Label();
            this.grpRecentLogs = new System.Windows.Forms.GroupBox();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.colTime = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colUser = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colDevice = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colAction = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colSource = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colResult = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.pnlSidebar.SuspendLayout();
            this.pnlHeader.SuspendLayout();
            this.pnlMain.SuspendLayout();
            this.grpDeviceControl.SuspendLayout();
            this.grpDoor.SuspendLayout();
            this.grpFan.SuspendLayout();
            this.grpLight.SuspendLayout();
            this.grpRecentLogs.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // pnlSidebar
            // 
            this.pnlSidebar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(99)))), ((int)(((byte)(235)))));
            this.pnlSidebar.Controls.Add(this.btnLogout);
            this.pnlSidebar.Controls.Add(this.lblApiStatus);
            this.pnlSidebar.Controls.Add(this.lblRole);
            this.pnlSidebar.Controls.Add(this.lblUsername);
            this.pnlSidebar.Dock = System.Windows.Forms.DockStyle.Left;
            this.pnlSidebar.Location = new System.Drawing.Point(0, 0);
            this.pnlSidebar.Name = "pnlSidebar";
            this.pnlSidebar.Size = new System.Drawing.Size(250, 681);
            this.pnlSidebar.TabIndex = 0;
            // 
            // btnLogout
            // 
            this.btnLogout.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.btnLogout.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(220)))), ((int)(((byte)(38)))), ((int)(((byte)(38)))));
            this.btnLogout.FlatAppearance.BorderSize = 0;
            this.btnLogout.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLogout.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnLogout.ForeColor = System.Drawing.Color.White;
            this.btnLogout.Location = new System.Drawing.Point(20, 630);
            this.btnLogout.Name = "btnLogout";
            this.btnLogout.Size = new System.Drawing.Size(210, 38);
            this.btnLogout.TabIndex = 3;
            this.btnLogout.Text = "LOGOUT";
            this.btnLogout.UseVisualStyleBackColor = false;
            this.btnLogout.Click += new System.EventHandler(this.btnLogout_Click);
            // 
            // lblApiStatus
            // 
            this.lblApiStatus.AutoSize = true;
            this.lblApiStatus.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblApiStatus.ForeColor = System.Drawing.Color.White;
            this.lblApiStatus.Location = new System.Drawing.Point(20, 130);
            this.lblApiStatus.Name = "lblApiStatus";
            this.lblApiStatus.Size = new System.Drawing.Size(130, 15);
            this.lblApiStatus.TabIndex = 2;
            this.lblApiStatus.Text = "Backend Status: Ready";
            // 
            // lblRole
            // 
            this.lblRole.AutoSize = true;
            this.lblRole.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblRole.ForeColor = System.Drawing.Color.White;
            this.lblRole.Location = new System.Drawing.Point(20, 80);
            this.lblRole.Name = "lblRole";
            this.lblRole.Size = new System.Drawing.Size(73, 19);
            this.lblRole.TabIndex = 1;
            this.lblRole.Text = "Role: USER";
            // 
            // lblUsername
            // 
            this.lblUsername.AutoSize = true;
            this.lblUsername.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblUsername.ForeColor = System.Drawing.Color.White;
            this.lblUsername.Location = new System.Drawing.Point(20, 30);
            this.lblUsername.Name = "lblUsername";
            this.lblUsername.Size = new System.Drawing.Size(91, 21);
            this.lblUsername.TabIndex = 0;
            this.lblUsername.Text = "Username";
            // 
            // pnlHeader
            // 
            this.pnlHeader.BackColor = System.Drawing.Color.White;
            this.pnlHeader.Controls.Add(this.lblHeaderSubtitle);
            this.pnlHeader.Controls.Add(this.lblHeaderTitle);
            this.pnlHeader.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlHeader.Location = new System.Drawing.Point(250, 0);
            this.pnlHeader.Name = "pnlHeader";
            this.pnlHeader.Size = new System.Drawing.Size(1016, 100);
            this.pnlHeader.TabIndex = 1;
            // 
            // lblHeaderSubtitle
            // 
            this.lblHeaderSubtitle.AutoSize = true;
            this.lblHeaderSubtitle.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblHeaderSubtitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.lblHeaderSubtitle.Location = new System.Drawing.Point(30, 50);
            this.lblHeaderSubtitle.Name = "lblHeaderSubtitle";
            this.lblHeaderSubtitle.Size = new System.Drawing.Size(310, 20);
            this.lblHeaderSubtitle.TabIndex = 1;
            this.lblHeaderSubtitle.Text = "Control your assigned smart devices";
            // 
            // lblHeaderTitle
            // 
            this.lblHeaderTitle.AutoSize = true;
            this.lblHeaderTitle.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblHeaderTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(99)))), ((int)(((byte)(235)))));
            this.lblHeaderTitle.Location = new System.Drawing.Point(30, 12);
            this.lblHeaderTitle.Name = "lblHeaderTitle";
            this.lblHeaderTitle.Size = new System.Drawing.Size(381, 32);
            this.lblHeaderTitle.TabIndex = 0;
            this.lblHeaderTitle.Text = "Smart House Dashboard";
            // 
            // pnlMain
            // 
            this.pnlMain.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(244)))), ((int)(((byte)(247)))), ((int)(((byte)(251)))));
            this.pnlMain.Controls.Add(this.grpRecentLogs);
            this.pnlMain.Controls.Add(this.grpDeviceControl);
            this.pnlMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMain.Location = new System.Drawing.Point(250, 100);
            this.pnlMain.Name = "pnlMain";
            this.pnlMain.Padding = new System.Windows.Forms.Padding(20);
            this.pnlMain.Size = new System.Drawing.Size(1016, 581);
            this.pnlMain.TabIndex = 2;
            // 
            // grpDeviceControl
            // 
            this.grpDeviceControl.Controls.Add(this.grpDoor);
            this.grpDeviceControl.Controls.Add(this.grpFan);
            this.grpDeviceControl.Controls.Add(this.grpLight);
            this.grpDeviceControl.Location = new System.Drawing.Point(20, 20);
            this.grpDeviceControl.Name = "grpDeviceControl";
            this.grpDeviceControl.Size = new System.Drawing.Size(600, 280);
            this.grpDeviceControl.TabIndex = 0;
            this.grpDeviceControl.TabStop = false;
            this.grpDeviceControl.Text = "Device Control";
            this.grpDeviceControl.Visible = true;
            // 
            // grpLight
            // 
            this.grpLight.BackColor = System.Drawing.Color.White;
            this.grpLight.Controls.Add(this.lblLightTitle);
            this.grpLight.Controls.Add(this.lblLightStatus);
            this.grpLight.Controls.Add(this.btnLightOn);
            this.grpLight.Controls.Add(this.btnLightOff);
            this.grpLight.Location = new System.Drawing.Point(15, 30);
            this.grpLight.Name = "grpLight";
            this.grpLight.Size = new System.Drawing.Size(180, 220);
            this.grpLight.TabIndex = 15;
            this.grpLight.TabStop = false;
            this.grpLight.Text = "Light";
            // 
            // lblLightTitle
            // 
            this.lblLightTitle.AutoSize = true;
            this.lblLightTitle.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblLightTitle.Location = new System.Drawing.Point(15, 20);
            this.lblLightTitle.Name = "lblLightTitle";
            this.lblLightTitle.Size = new System.Drawing.Size(77, 20);
            this.lblLightTitle.TabIndex = 0;
            this.lblLightTitle.Text = "Room Light";
            // 
            // lblLightStatus
            // 
            this.lblLightStatus.AutoSize = true;
            this.lblLightStatus.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblLightStatus.ForeColor = System.Drawing.Color.Gray;
            this.lblLightStatus.Location = new System.Drawing.Point(15, 50);
            this.lblLightStatus.Name = "lblLightStatus";
            this.lblLightStatus.Size = new System.Drawing.Size(64, 15);
            this.lblLightStatus.TabIndex = 1;
            this.lblLightStatus.Text = "Status: OFF";
            // 
            // btnLightOn
            // 
            this.btnLightOn.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(99)))), ((int)(((byte)(235)))));
            this.btnLightOn.FlatAppearance.BorderSize = 0;
            this.btnLightOn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLightOn.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnLightOn.ForeColor = System.Drawing.Color.White;
            this.btnLightOn.Location = new System.Drawing.Point(15, 85);
            this.btnLightOn.Name = "btnLightOn";
            this.btnLightOn.Size = new System.Drawing.Size(80, 35);
            this.btnLightOn.TabIndex = 2;
            this.btnLightOn.Text = "Turn ON";
            this.btnLightOn.UseVisualStyleBackColor = false;
            this.btnLightOn.Click += new System.EventHandler(this.btnLightOn_Click);
            // 
            // btnLightOff
            // 
            this.btnLightOff.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.btnLightOff.FlatAppearance.BorderSize = 0;
            this.btnLightOff.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnLightOff.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnLightOff.ForeColor = System.Drawing.Color.White;
            this.btnLightOff.Location = new System.Drawing.Point(15, 130);
            this.btnLightOff.Name = "btnLightOff";
            this.btnLightOff.Size = new System.Drawing.Size(80, 35);
            this.btnLightOff.TabIndex = 3;
            this.btnLightOff.Text = "Turn OFF";
            this.btnLightOff.UseVisualStyleBackColor = false;
            this.btnLightOff.Click += new System.EventHandler(this.btnLightOff_Click);
            // 
            // grpFan
            // 
            this.grpFan.BackColor = System.Drawing.Color.White;
            this.grpFan.Controls.Add(this.lblFanTitle);
            this.grpFan.Controls.Add(this.lblFanStatus);
            this.grpFan.Controls.Add(this.btnFanOn);
            this.grpFan.Controls.Add(this.btnFanOff);
            this.grpFan.Location = new System.Drawing.Point(210, 30);
            this.grpFan.Name = "grpFan";
            this.grpFan.Size = new System.Drawing.Size(180, 220);
            this.grpFan.TabIndex = 16;
            this.grpFan.TabStop = false;
            this.grpFan.Text = "Fan";
            // 
            // lblFanTitle
            // 
            this.lblFanTitle.AutoSize = true;
            this.lblFanTitle.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblFanTitle.Location = new System.Drawing.Point(15, 20);
            this.lblFanTitle.Name = "lblFanTitle";
            this.lblFanTitle.Size = new System.Drawing.Size(31, 20);
            this.lblFanTitle.TabIndex = 4;
            this.lblFanTitle.Text = "Fan";
            // 
            // lblFanStatus
            // 
            this.lblFanStatus.AutoSize = true;
            this.lblFanStatus.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblFanStatus.ForeColor = System.Drawing.Color.Gray;
            this.lblFanStatus.Location = new System.Drawing.Point(15, 50);
            this.lblFanStatus.Name = "lblFanStatus";
            this.lblFanStatus.Size = new System.Drawing.Size(64, 15);
            this.lblFanStatus.TabIndex = 5;
            this.lblFanStatus.Text = "Status: OFF";
            // 
            // btnFanOn
            // 
            this.btnFanOn.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(99)))), ((int)(((byte)(235)))));
            this.btnFanOn.FlatAppearance.BorderSize = 0;
            this.btnFanOn.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnFanOn.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnFanOn.ForeColor = System.Drawing.Color.White;
            this.btnFanOn.Location = new System.Drawing.Point(15, 85);
            this.btnFanOn.Name = "btnFanOn";
            this.btnFanOn.Size = new System.Drawing.Size(80, 35);
            this.btnFanOn.TabIndex = 6;
            this.btnFanOn.Text = "Turn ON";
            this.btnFanOn.UseVisualStyleBackColor = false;
            this.btnFanOn.Click += new System.EventHandler(this.btnFanOn_Click);
            // 
            // btnFanOff
            // 
            this.btnFanOff.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.btnFanOff.FlatAppearance.BorderSize = 0;
            this.btnFanOff.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnFanOff.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnFanOff.ForeColor = System.Drawing.Color.White;
            this.btnFanOff.Location = new System.Drawing.Point(15, 130);
            this.btnFanOff.Name = "btnFanOff";
            this.btnFanOff.Size = new System.Drawing.Size(80, 35);
            this.btnFanOff.TabIndex = 7;
            this.btnFanOff.Text = "Turn OFF";
            this.btnFanOff.UseVisualStyleBackColor = false;
            this.btnFanOff.Click += new System.EventHandler(this.btnFanOff_Click);
            // 
            // grpDoor
            // 
            this.grpDoor.BackColor = System.Drawing.Color.White;
            this.grpDoor.Controls.Add(this.lblDoorTitle);
            this.grpDoor.Controls.Add(this.lblDoorStatus);
            this.grpDoor.Controls.Add(this.btnDoorOpen);
            this.grpDoor.Controls.Add(this.btnDoorClose);
            this.grpDoor.Location = new System.Drawing.Point(405, 30);
            this.grpDoor.Name = "grpDoor";
            this.grpDoor.Size = new System.Drawing.Size(180, 220);
            this.grpDoor.TabIndex = 17;
            this.grpDoor.TabStop = false;
            this.grpDoor.Text = "Door";
            // 
            // lblDoorTitle
            // 
            this.lblDoorTitle.AutoSize = true;
            this.lblDoorTitle.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblDoorTitle.Location = new System.Drawing.Point(15, 20);
            this.lblDoorTitle.Name = "lblDoorTitle";
            this.lblDoorTitle.Size = new System.Drawing.Size(104, 20);
            this.lblDoorTitle.TabIndex = 8;
            this.lblDoorTitle.Text = "Automatic Door";
            // 
            // lblDoorStatus
            // 
            this.lblDoorStatus.AutoSize = true;
            this.lblDoorStatus.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblDoorStatus.ForeColor = System.Drawing.Color.Gray;
            this.lblDoorStatus.Location = new System.Drawing.Point(15, 50);
            this.lblDoorStatus.Name = "lblDoorStatus";
            this.lblDoorStatus.Size = new System.Drawing.Size(82, 15);
            this.lblDoorStatus.TabIndex = 9;
            this.lblDoorStatus.Text = "Status: CLOSED";
            // 
            // btnDoorOpen
            // 
            this.btnDoorOpen.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(99)))), ((int)(((byte)(235)))));
            this.btnDoorOpen.FlatAppearance.BorderSize = 0;
            this.btnDoorOpen.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDoorOpen.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDoorOpen.ForeColor = System.Drawing.Color.White;
            this.btnDoorOpen.Location = new System.Drawing.Point(15, 85);
            this.btnDoorOpen.Name = "btnDoorOpen";
            this.btnDoorOpen.Size = new System.Drawing.Size(80, 35);
            this.btnDoorOpen.TabIndex = 10;
            this.btnDoorOpen.Text = "OPEN";
            this.btnDoorOpen.UseVisualStyleBackColor = false;
            this.btnDoorOpen.Click += new System.EventHandler(this.btnDoorOpen_Click);
            // 
            // btnDoorClose
            // 
            this.btnDoorClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(116)))), ((int)(((byte)(139)))));
            this.btnDoorClose.FlatAppearance.BorderSize = 0;
            this.btnDoorClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDoorClose.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDoorClose.ForeColor = System.Drawing.Color.White;
            this.btnDoorClose.Location = new System.Drawing.Point(15, 130);
            this.btnDoorClose.Name = "btnDoorClose";
            this.btnDoorClose.Size = new System.Drawing.Size(80, 35);
            this.btnDoorClose.TabIndex = 11;
            this.btnDoorClose.Text = "CLOSE";
            this.btnDoorClose.UseVisualStyleBackColor = false;
            this.btnDoorClose.Click += new System.EventHandler(this.btnDoorClose_Click);
            // 
            // grpRecentLogs
            // 
            this.grpRecentLogs.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.grpRecentLogs.Controls.Add(this.dataGridView1);
            this.grpRecentLogs.Location = new System.Drawing.Point(640, 20);
            this.grpRecentLogs.Name = "grpRecentLogs";
            this.grpRecentLogs.Size = new System.Drawing.Size(356, 540);
            this.grpRecentLogs.TabIndex = 1;
            this.grpRecentLogs.TabStop = false;
            this.grpRecentLogs.Text = "Recent Logs";
            // 
            // dataGridView1
            // 
            this.dataGridView1.AllowUserToAddRows = false;
            this.dataGridView1.AllowUserToDeleteRows = false;
            this.dataGridView1.AllowUserToResizeRows = false;
            this.dataGridView1.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataGridView1.BackgroundColor = System.Drawing.Color.White;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.colTime,
            this.colUser,
            this.colDevice,
            this.colAction,
            this.colSource,
            this.colResult});
            this.dataGridView1.Location = new System.Drawing.Point(15, 25);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.ReadOnly = true;
            this.dataGridView1.RowHeadersVisible = false;
            this.dataGridView1.RowHeadersWidth = 51;
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridView1.Size = new System.Drawing.Size(326, 500);
            this.dataGridView1.TabIndex = 0;
            // 
            // colTime
            // 
            this.colTime.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.colTime.HeaderText = "Time";
            this.colTime.MinimumWidth = 6;
            this.colTime.Name = "colTime";
            // 
            // colUser
            // 
            this.colUser.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.colUser.HeaderText = "User";
            this.colUser.MinimumWidth = 6;
            this.colUser.Name = "colUser";
            // 
            // colDevice
            // 
            this.colDevice.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.colDevice.HeaderText = "Device";
            this.colDevice.MinimumWidth = 6;
            this.colDevice.Name = "colDevice";
            // 
            // colAction
            // 
            this.colAction.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.colAction.HeaderText = "Action";
            this.colAction.MinimumWidth = 6;
            this.colAction.Name = "colAction";
            // 
            // colSource
            // 
            this.colSource.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.colSource.HeaderText = "Source";
            this.colSource.MinimumWidth = 6;
            this.colSource.Name = "colSource";
            // 
            // colResult
            // 
            this.colResult.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.colResult.HeaderText = "Result";
            this.colResult.MinimumWidth = 6;
            this.colResult.Name = "colResult";
            // 
            // MainFrom
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1266, 681);
            this.Controls.Add(this.pnlMain);
            this.Controls.Add(this.pnlHeader);
            this.Controls.Add(this.pnlSidebar);
            this.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MinimumSize = new System.Drawing.Size(1000, 600);
            this.Name = "MainFrom";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Smart House Control - Dashboard";
            this.Load += new System.EventHandler(this.MainFrom_Load);
            this.pnlSidebar.ResumeLayout(false);
            this.pnlSidebar.PerformLayout();
            this.pnlHeader.ResumeLayout(false);
            this.pnlHeader.PerformLayout();
            this.pnlMain.ResumeLayout(false);
            this.grpDeviceControl.ResumeLayout(false);
            this.grpLight.ResumeLayout(false);
            this.grpLight.PerformLayout();
            this.grpFan.ResumeLayout(false);
            this.grpFan.PerformLayout();
            this.grpDoor.ResumeLayout(false);
            this.grpDoor.PerformLayout();
            this.grpRecentLogs.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlSidebar;
        private System.Windows.Forms.Button btnLogout;
        private System.Windows.Forms.Label lblApiStatus;
        private System.Windows.Forms.Label lblRole;
        private System.Windows.Forms.Label lblUsername;
        private System.Windows.Forms.Panel pnlHeader;
        private System.Windows.Forms.Label lblHeaderSubtitle;
        private System.Windows.Forms.Label lblHeaderTitle;
        private System.Windows.Forms.Panel pnlMain;
        private System.Windows.Forms.GroupBox grpRecentLogs;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn colTime;
        private System.Windows.Forms.DataGridViewTextBoxColumn colUser;
        private System.Windows.Forms.DataGridViewTextBoxColumn colDevice;
        private System.Windows.Forms.DataGridViewTextBoxColumn colAction;
        private System.Windows.Forms.DataGridViewTextBoxColumn colSource;
        private System.Windows.Forms.DataGridViewTextBoxColumn colResult;
        private System.Windows.Forms.GroupBox grpDeviceControl;
        private System.Windows.Forms.GroupBox grpDoor;
        private System.Windows.Forms.Button btnDoorClose;
        private System.Windows.Forms.Button btnDoorOpen;
        private System.Windows.Forms.Label lblDoorStatus;
        private System.Windows.Forms.Label lblDoorTitle;
        private System.Windows.Forms.GroupBox grpFan;
        private System.Windows.Forms.Label lblFanTitle;
        private System.Windows.Forms.Label lblFanStatus;
        private System.Windows.Forms.Button btnFanOn;
        private System.Windows.Forms.Button btnFanOff;
        private System.Windows.Forms.GroupBox grpLight;
        private System.Windows.Forms.Label lblLightTitle;
        private System.Windows.Forms.Label lblLightStatus;
        private System.Windows.Forms.Button btnLightOn;
        private System.Windows.Forms.Button btnLightOff;
    }
}