using System;
using System.Drawing;
using System.Net.Http;
using System.Text;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace SmartHouseWinform
{
    public partial class LoginForm : Form
    {
        public LoginForm()
        {
            InitializeComponent();
        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            string username = txtUsername.Text.Trim();
            string password = txtPassword.Text.Trim();

            if (string.IsNullOrEmpty(username) ||
                string.IsNullOrEmpty(password))
            {
                MessageBox.Show(
                    "Vui lòng nhập username và password."
                );

                return;
            }

            var body = new
            {
                username = username,
                password = password
            };

            string json = JsonConvert.SerializeObject(body);

            using (HttpClient client = new HttpClient())
            {
                var content = new StringContent(
                    json,
                    Encoding.UTF8,
                    "application/json"
                );

                try
                {
                    var response = await client.PostAsync(
                        ApiConfig.BaseUrl + "/auth/token",
                        content
                    );

                    string result =
                        await response.Content.ReadAsStringAsync();

                    if (!response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Đăng nhập thất bại.");
                        return;
                    }

                    dynamic data =
                        JsonConvert.DeserializeObject(result);

                    ApiConfig.Token = data.result.token;

                    MessageBox.Show(
                        "Đăng nhập thành công."
                    );

                    MainFrom mainForm = new MainFrom();

                    mainForm.SetLoginUser(username);

                    mainForm.Show();

                    this.Hide();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(
                        "Lỗi gọi API: " + ex.Message
                    );
                }
            }
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void pnlCard_Paint(
            object sender,
            PaintEventArgs e)
        {

        }
    }
}