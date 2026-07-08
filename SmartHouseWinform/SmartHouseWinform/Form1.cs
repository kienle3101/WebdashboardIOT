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
    public partial class LoginForm : Form
    {
        // Hardcoded demo accounts
        private Dictionary<string, string> validAccounts = new Dictionary<string, string>
        {
            { "admin", "123456" },
            { "user1", "123456" },
            { "user2", "123456" },
            { "user3", "123456" }
        };

        public LoginForm()
        {
            InitializeComponent();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            string username = txtUsername.Text.Trim();
            string password = txtPassword.Text.Trim();

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Please enter both username and password.", "Login Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // Check if account exists
            if (!validAccounts.ContainsKey(username))
            {
                MessageBox.Show("Username not found.\n\nTest accounts:\n" +
                    "• admin / 123456  (Full access to all devices)\n" +
                    "• user1 / 123456  (Light + Fan)\n" +
                    "• user2 / 123456  (Light only)\n" +
                    "• user3 / 123456  (Door only)", "Login Failed", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            // Check if password is correct
            if (validAccounts[username] != password)
            {
                MessageBox.Show("Incorrect password.", "Login Failed", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            // Login successful
            MainFrom mainForm = new MainFrom();
            mainForm.SetLoginUser(username);
            mainForm.Show();
            this.Hide();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
