using System;
using System.Collections.Generic;
using System.Drawing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace SmartHouseWinform
{
    public partial class MainFrom : Form
    {
        private string currentUser;
        private string currentRole = "USER";
        private List<string> userPermissions = new List<string>();
        private List<LogEntry> logs = new List<LogEntry>();

        public MainFrom()
        {
            InitializeComponent();
        }

        public void SetLoginUser(string username)
        {
            currentUser = username;
        }

        private async void MainFrom_Load(object sender, EventArgs e)
        {
            ApplyTheme();

            await LoadUserInfoFromApi();
            await LoadDevicesFromApi();
            await LoadLogsFromApi();

            ApplyPermissionToButtons();
        }

        private HttpClient CreateClient()
        {
            HttpClient client = new HttpClient();

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", ApiConfig.Token);

            return client;
        }

        private async Task LoadUserInfoFromApi()
        {
            try
            {
                using (HttpClient client = CreateClient())
                {
                    var response = await client.GetAsync(ApiConfig.BaseUrl + "/users/myInfo");
                    string result = await response.Content.ReadAsStringAsync();

                    if (!response.IsSuccessStatusCode)
                    {
                        lblApiStatus.Text = "Backend Status: Error";
                        MessageBox.Show("Không lấy được thông tin user.");
                        return;
                    }

                    dynamic data = JsonConvert.DeserializeObject(result);

                    currentUser = data.result.username;
                    currentRole = data.result.roles[0].name;

                    userPermissions.Clear();

                    foreach (var p in data.result.permissions)
                    {
                        userPermissions.Add((string)p.name);
                    }

                    lblUsername.Text = "Username: " + currentUser;
                    lblRole.Text = "Role: " + currentRole;
                    lblApiStatus.Text = "Backend Status: Ready";
                }
            }
            catch (Exception ex)
            {
                lblApiStatus.Text = "Backend Status: Error";
                MessageBox.Show("Lỗi API myInfo: " + ex.Message);
            }
        }

        private async Task LoadDevicesFromApi()
        {
            try
            {
                using (HttpClient client = CreateClient())
                {
                    var response = await client.GetAsync(ApiConfig.BaseUrl + "/devices");
                    string result = await response.Content.ReadAsStringAsync();

                    if (!response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Không lấy được danh sách thiết bị.");
                        return;
                    }

                    dynamic data = JsonConvert.DeserializeObject(result);

                    foreach (var device in data.result)
                    {
                        string code = device.deviceCode;
                        string status = device.currentStatus;

                        if (code == "LIGHT")
                            lblLightStatus.Text = "Status: " + status;

                        if (code == "FAN")
                            lblFanStatus.Text = "Status: " + status;

                        if (code == "DOOR")
                            lblDoorStatus.Text = "Status: " + status;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Lỗi API devices: " + ex.Message);
            }
        }

        private async Task LoadLogsFromApi()
        {
            try
            {
                using (HttpClient client = CreateClient())
                {
                    var response = await client.GetAsync(ApiConfig.BaseUrl + "/logs/myLogs");
                    string result = await response.Content.ReadAsStringAsync();

                    if (!response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Không lấy được logs.");
                        return;
                    }

                    dynamic data = JsonConvert.DeserializeObject(result);

                    logs.Clear();

                    foreach (var item in data.result.content)
                    {
                        logs.Add(new LogEntry
                        {
                            Time = ((string)item.createdAt).Substring(11, 5),
                            User = item.username,
                            Device = item.deviceCode,
                            Action = item.action,
                            Source = item.source,
                            Result = item.result
                        });
                    }

                    RefreshDataGrid();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Lỗi API logs: " + ex.Message);
            }
        }

        private bool HasPermission(string permission)
        {
            if (currentRole == "ADMIN") return true;
            return userPermissions.Contains(permission);
        }

        private void ApplyPermissionToButtons()
        {
            btnLightOn.Enabled = HasPermission("DEVICE_LIGHT");
            btnLightOff.Enabled = HasPermission("DEVICE_LIGHT");

            btnFanOn.Enabled = HasPermission("DEVICE_FAN");
            btnFanOff.Enabled = HasPermission("DEVICE_FAN");

            btnDoorOpen.Enabled = HasPermission("DEVICE_DOOR");
            btnDoorClose.Enabled = HasPermission("DEVICE_DOOR");
        }

        private async Task ControlDevice(string deviceCode, string command)
        {
            try
            {
                using (HttpClient client = CreateClient())
                {
                    var body = new
                    {
                        command = command,
                        source = "WINDOWS_FORM"
                    };

                    string json = JsonConvert.SerializeObject(body);

                    var content = new StringContent(
                        json,
                        System.Text.Encoding.UTF8,
                        "application/json"
                    );

                    var response = await client.PostAsync(
                        ApiConfig.BaseUrl + "/devices/code/" + deviceCode + "/control",
                        content
                    );

                    string result = await response.Content.ReadAsStringAsync();

                    if (!response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Điều khiển thiết bị thất bại.");
                        await LoadLogsFromApi();
                        return;
                    }

                    dynamic data = JsonConvert.DeserializeObject(result);

                    string status = data.result.currentStatus;

                    if (deviceCode == "LIGHT")
                        lblLightStatus.Text = "Status: " + status;

                    if (deviceCode == "FAN")
                        lblFanStatus.Text = "Status: " + status;

                    if (deviceCode == "DOOR")
                        lblDoorStatus.Text = "Status: " + status;

                    MessageBox.Show("Điều khiển thành công: " + command);

                    await LoadLogsFromApi();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Lỗi API control: " + ex.Message);
            }
        }

        private async void btnLightOn_Click(object sender, EventArgs e)
        {
            await ControlDevice("LIGHT", "LIGHT_ON");
        }

        private async void btnLightOff_Click(object sender, EventArgs e)
        {
            await ControlDevice("LIGHT", "LIGHT_OFF");
        }

        private async void btnFanOn_Click(object sender, EventArgs e)
        {
            await ControlDevice("FAN", "FAN_ON");
        }

        private async void btnFanOff_Click(object sender, EventArgs e)
        {
            await ControlDevice("FAN", "FAN_OFF");
        }

        private async void btnDoorOpen_Click(object sender, EventArgs e)
        {
            await ControlDevice("DOOR", "DOOR_OPEN");
        }

        private async void btnDoorClose_Click(object sender, EventArgs e)
        {
            await ControlDevice("DOOR", "DOOR_CLOSE");
        }

        private void RefreshDataGrid()
        {
            dataGridView1.DataSource = null;
            dataGridView1.DataSource = logs;

            dataGridView1.ColumnHeadersDefaultCellStyle.BackColor =
                Color.FromArgb(37, 99, 235);

            dataGridView1.ColumnHeadersDefaultCellStyle.ForeColor =
                Color.White;

            dataGridView1.ColumnHeadersDefaultCellStyle.Font =
                new Font("Segoe UI", 10F, FontStyle.Bold);

            dataGridView1.AlternatingRowsDefaultCellStyle.BackColor =
                Color.FromArgb(244, 247, 251);

            dataGridView1.DefaultCellStyle.BackColor = Color.White;
            dataGridView1.DefaultCellStyle.SelectionBackColor =
                Color.FromArgb(37, 99, 235);

            dataGridView1.DefaultCellStyle.SelectionForeColor = Color.White;
        }

        private void ApplyTheme()
        {
            this.BackColor = Color.FromArgb(244, 247, 251);
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            LoginForm loginForm = new LoginForm();
            loginForm.Show();
            this.Close();
        }

        private void pnlHeader_Paint(object sender, PaintEventArgs e)
        {

        }
    }

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