using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartHouseWinform
{
    public partial class MainFrom : Form
    {
        private string currentUser;
        private string currentRole = "USER";
        private List<string> userPermissions;
        private List<string> deviceStates; // Light, Fan, Door
        private List<LogEntry> logs;

        public MainFrom()
        {
            InitializeComponent();
        }

        public void SetLoginUser(string username)
        {
            currentUser = username;
        }

        private void MainFrom_Load(object sender, EventArgs e)
        {
            LoadMockPermissions();
            LoadMockDevices();
            LoadMockLogs();
            UpdateUI();
            ApplyPermissionToButtons();
            ApplyTheme();
            RefreshDataGrid();
        }

        private void LoadMockPermissions()
        {
            // Define permissions for each account
            currentRole = "USER";
            userPermissions = new List<string>();

            string usernameLower = currentUser.ToLower();

            switch (usernameLower)
            {
                case "admin":
                    // ADMIN: Full access to all devices
                    currentRole = "ADMIN";
                    userPermissions = new List<string> { "DEVICE_LIGHT", "DEVICE_FAN", "DEVICE_DOOR" };
                    break;

                case "user1":
                    // USER1: Light + Fan only (no Door)
                    currentRole = "USER";
                    userPermissions = new List<string> { "DEVICE_LIGHT", "DEVICE_FAN" };
                    break;

                case "user2":
                    // USER2: Light only (no Fan, no Door)
                    currentRole = "USER";
                    userPermissions = new List<string> { "DEVICE_LIGHT" };
                    break;

                case "user3":
                    // USER3: Door only (no Light, no Fan)
                    currentRole = "USER";
                    userPermissions = new List<string> { "DEVICE_DOOR" };
                    break;

                default:
                    // Default: No permissions
                    userPermissions = new List<string>();
                    break;
            }

            lblUsername.Text = $"Username: {currentUser}";
            lblRole.Text = $"Role: {currentRole}";
        }

        private void LoadMockDevices()
        {
            deviceStates = new List<string> { "OFF", "OFF", "CLOSED" }; // Light, Fan, Door
        }

        private void LoadMockLogs()
        {
            logs = new List<LogEntry>
            {
                new LogEntry { Time = "09:00", User = currentUser, Device = "LIGHT", Action = "LIGHT_ON", Source = "WINDOWS_FORM", Result = "SUCCESS" },
                new LogEntry { Time = "09:15", User = currentUser, Device = "FAN", Action = "FAN_ON", Source = "WINDOWS_FORM", Result = "SUCCESS" },
                new LogEntry { Time = "09:30", User = currentUser, Device = "LIGHT", Action = "LIGHT_OFF", Source = "WINDOWS_FORM", Result = "SUCCESS" },
            };
        }

        private void UpdateUI()
        {
            lblLightStatus.Text = $"Status: {deviceStates[0]}";
            lblFanStatus.Text = $"Status: {deviceStates[1]}";
            lblDoorStatus.Text = $"Status: {deviceStates[2]}";
        }

        private void ApplyPermissionToButtons()
        {
            // Light buttons
            if (!HasPermission("DEVICE_LIGHT"))
            {
                btnLightOn.Enabled = false;
                btnLightOff.Enabled = false;
                btnLightOn.BackColor = Color.LightGray;
                btnLightOff.BackColor = Color.LightGray;
            }

            // Fan buttons
            if (!HasPermission("DEVICE_FAN"))
            {
                btnFanOn.Enabled = false;
                btnFanOff.Enabled = false;
                btnFanOn.BackColor = Color.LightGray;
                btnFanOff.BackColor = Color.LightGray;
            }

            // Door buttons
            if (!HasPermission("DEVICE_DOOR"))
            {
                btnDoorOpen.Enabled = false;
                btnDoorClose.Enabled = false;
                btnDoorOpen.BackColor = Color.LightGray;
                btnDoorClose.BackColor = Color.LightGray;
            }
        }

        private bool HasPermission(string devicePermission)
        {
            if (currentRole == "ADMIN") return true;
            return userPermissions.Contains(devicePermission);
        }

        private void ApplyTheme()
        {
            // Apply modern theme colors
            this.BackColor = Color.FromArgb(244, 247, 251);
        }

        private void RefreshDataGrid()
        {
            dataGridView1.DataSource = null;
            dataGridView1.DataSource = logs;

            // Format column headers
            dataGridView1.ColumnHeadersDefaultCellStyle.BackColor = Color.FromArgb(37, 99, 235);
            dataGridView1.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
            dataGridView1.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 10F, FontStyle.Bold);

            // Alternate row colors
            dataGridView1.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(244, 247, 251);
            dataGridView1.DefaultCellStyle.BackColor = Color.White;
            dataGridView1.DefaultCellStyle.SelectionBackColor = Color.FromArgb(37, 99, 235);
            dataGridView1.DefaultCellStyle.SelectionForeColor = Color.White;
        }

        private void AddLogEntry(string device, string action, string result)
        {
            LogEntry entry = new LogEntry
            {
                Time = DateTime.Now.ToString("HH:mm"),
                User = currentUser,
                Device = device,
                Action = action,
                Source = "WINDOWS_FORM",
                Result = result
            };
            logs.Insert(0, entry); // Add to top
            RefreshDataGrid();
        }

        // Device Control Handlers
        private void btnLightOn_Click(object sender, EventArgs e)
        {
            if (HasPermission("DEVICE_LIGHT"))
            {
                deviceStates[0] = "ON";
                UpdateUI();
                AddLogEntry("LIGHT", "LIGHT_ON", "SUCCESS");
            }
            else
            {
                MessageBox.Show("No permission to control this device.", "Permission Denied", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnLightOff_Click(object sender, EventArgs e)
        {
            if (HasPermission("DEVICE_LIGHT"))
            {
                deviceStates[0] = "OFF";
                UpdateUI();
                AddLogEntry("LIGHT", "LIGHT_OFF", "SUCCESS");
            }
            else
            {
                MessageBox.Show("No permission to control this device.", "Permission Denied", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnFanOn_Click(object sender, EventArgs e)
        {
            if (HasPermission("DEVICE_FAN"))
            {
                deviceStates[1] = "ON";
                UpdateUI();
                AddLogEntry("FAN", "FAN_ON", "SUCCESS");
            }
            else
            {
                MessageBox.Show("No permission to control this device.", "Permission Denied", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnFanOff_Click(object sender, EventArgs e)
        {
            if (HasPermission("DEVICE_FAN"))
            {
                deviceStates[1] = "OFF";
                UpdateUI();
                AddLogEntry("FAN", "FAN_OFF", "SUCCESS");
            }
            else
            {
                MessageBox.Show("No permission to control this device.", "Permission Denied", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnDoorOpen_Click(object sender, EventArgs e)
        {
            if (HasPermission("DEVICE_DOOR"))
            {
                deviceStates[2] = "OPEN";
                UpdateUI();
                AddLogEntry("DOOR", "DOOR_OPEN", "SUCCESS");
            }
            else
            {
                MessageBox.Show("No permission to control this device.", "Permission Denied", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnDoorClose_Click(object sender, EventArgs e)
        {
            if (HasPermission("DEVICE_DOOR"))
            {
                deviceStates[2] = "CLOSED";
                UpdateUI();
                AddLogEntry("DOOR", "DOOR_CLOSE", "SUCCESS");
            }
            else
            {
                MessageBox.Show("No permission to control this device.", "Permission Denied", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            LoginForm loginForm = new LoginForm();
            loginForm.Show();
            this.Close();
        }
    }

    // Data structure for logs
    public class LogEntry
    {
        public string Time { get; set; }
        public string User { get; set; }
        public string Device { get; set; }
        public string Action { get; set; }
        public string Source { get; set; }
        public string Result { get; set; }
    }
}
