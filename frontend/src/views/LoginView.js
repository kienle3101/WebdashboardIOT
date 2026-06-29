import { state, apiFetch } from '../state.js';

export const LoginView = {
  render(container) {
    container.innerHTML = `
      <div class="login-container d-flex align-items-center justify-content-center min-vh-100 p-3">
        <div class="login-card card border-0 shadow-lg overflow-hidden w-100" style="max-width: 1000px; border-radius: 24px;">
          <div class="row g-0">
            <!-- Left Panel (Illustration) -->
            <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
              <div class="logo-area d-flex align-items-center gap-2 mb-4">
                <div class="logo-icon bg-white text-primary rounded-3 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; font-size: 24px;">
                  <i class="bi bi-house-door-fill"></i>
                </div>
                <div>
                  <h4 class="fw-bold mb-0 text-white">SmartHouse Mini</h4>
                  <small style="opacity: 0.8;">Hệ thống quản lý thông minh</small>
                </div>
              </div>

              <div class="illustration-content my-auto z-1">
                <h2 class="fw-bold mb-3">Nhà thông minh trong tầm tay bạn</h2>
                <p class="lead fs-6" style="opacity: 0.9; line-height: 1.6;">
                  Giám sát và điều khiển các thiết bị trong ngôi nhà của bạn mọi lúc, mọi nơi. An toàn - Tiện lợi - Tiết kiệm.
                </p>
                
                <!-- Status List Demo Cards -->
                <div class="demo-statuses d-flex flex-column gap-3 mt-4" style="max-width: 320px;">
                  <div class="demo-status-item d-flex align-items-center justify-content-between bg-white bg-opacity-10 p-3 rounded-4" style="backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
                    <div class="d-flex align-items-center gap-3">
                      <div class="status-icon bg-success bg-opacity-20 text-success rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-size: 20px;">
                        <i class="bi bi-lightbulb-fill"></i>
                      </div>
                      <div>
                        <div class="fw-semibold text-white small">Đèn phòng</div>
                        <small class="text-white bg-success px-2 py-0.5 rounded-pill" style="font-size: 10px;">ON</small>
                      </div>
                    </div>
                  </div>

                  <div class="demo-status-item d-flex align-items-center justify-content-between bg-white bg-opacity-10 p-3 rounded-4" style="backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
                    <div class="d-flex align-items-center gap-3">
                      <div class="status-icon bg-warning bg-opacity-20 text-warning rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-size: 20px;">
                        <i class="bi bi-fan"></i>
                      </div>
                      <div>
                        <div class="fw-semibold text-white small">Quạt</div>
                        <small class="text-white bg-warning px-2 py-0.5 rounded-pill" style="font-size: 10px;">ON</small>
                      </div>
                    </div>
                  </div>

                  <div class="demo-status-item d-flex align-items-center justify-content-between bg-white bg-opacity-10 p-3 rounded-4" style="backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
                    <div class="d-flex align-items-center gap-3">
                      <div class="status-icon bg-info bg-opacity-20 text-info rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-size: 20px;">
                        <i class="bi bi-door-closed-fill"></i>
                      </div>
                      <div>
                        <div class="fw-semibold text-white small">Cửa tự động</div>
                        <small class="text-white bg-info px-2 py-0.5 rounded-pill" style="font-size: 10px;">Đóng</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4" style="font-size: 12px; opacity: 0.7;">
                © 2026 SmartHouse Mini. All rights reserved.
              </div>
            </div>

            <!-- Right Panel (Form) -->
            <div class="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between bg-white">
              <div class="my-auto py-3">
                <h3 class="fw-bold text-dark mb-1">Chào mừng trở lại!</h3>
                <p class="text-muted mb-4 small">Đăng nhập để tiếp tục quản lý ngôi nhà của bạn.</p>

                <div id="login-error-alert" class="alert alert-danger d-none rounded-3 small p-2" role="alert"></div>

                <form id="login-form">
                  <div class="mb-3">
                    <label for="username" class="form-label text-secondary small fw-semibold">Tên đăng nhập</label>
                    <div class="input-group">
                      <span class="input-group-text bg-light border-0 text-muted"><i class="bi bi-person-fill"></i></span>
                      <input type="text" class="form-control bg-light border-0" id="username" placeholder="Nhập tên đăng nhập" required>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="password" class="form-label text-secondary small fw-semibold">Mật khẩu</label>
                    <div class="input-group">
                      <span class="input-group-text bg-light border-0 text-muted"><i class="bi bi-lock-fill"></i></span>
                      <input type="password" class="form-control bg-light border-0" id="password" placeholder="Nhập mật khẩu" required>
                      <button class="btn btn-light border-0 text-muted" type="button" id="password-toggle">
                        <i class="bi bi-eye-slash-fill"></i>
                      </button>
                    </div>
                  </div>

                  <div class="d-flex align-items-center justify-content-between mb-4 small">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="remember-me">
                      <label class="form-check-input-label text-secondary" for="remember-me">Ghi nhớ đăng nhập</label>
                    </div>
                    <a href="#" class="text-primary text-decoration-none fw-semibold">Quên mật khẩu?</a>
                  </div>

                  <button type="submit" class="btn btn-primary w-100 py-2.5 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2" id="login-btn">
                    <i class="bi bi-box-arrow-in-right"></i> Đăng nhập
                  </button>
                </form>
              </div>

              <div class="mt-4 pt-3 border-top">
                <div class="d-flex align-items-center gap-2 text-primary bg-primary bg-opacity-10 p-3 rounded-4" style="font-size: 13px;">
                  <i class="bi bi-shield-fill-check fs-5"></i>
                  <div>
                    Hệ thống hỗ trợ phân quyền với 2 vai trò:<br>
                    <strong>ADMIN</strong> và <strong>USER</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event Listeners
    const form = container.querySelector('#login-form');
    const usernameInput = container.querySelector('#username');
    const passwordInput = container.querySelector('#password');
    const passwordToggle = container.querySelector('#password-toggle');
    const errorAlert = container.querySelector('#login-error-alert');
    const loginBtn = container.querySelector('#login-btn');

    // Show/Hide password toggle
    passwordToggle.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      const icon = passwordToggle.querySelector('i');
      if (type === 'password') {
        icon.className = 'bi bi-eye-slash-fill';
      } else {
        icon.className = 'bi bi-eye-fill';
      }
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorAlert.classList.add('d-none');
      loginBtn.disabled = true;
      loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang kết nối...`;

      try {
        const resultData = await apiFetch('/auth/token', {
          method: 'POST',
          body: JSON.stringify({
            username: usernameInput.value.trim(),
            password: passwordInput.value
          })
        });

        if (resultData && resultData.result && resultData.result.token) {
          state.setToken(resultData.result.token);
          
          // Fetch current user details
          const userDetails = await apiFetch('/users/myInfo');
          state.setUser(userDetails.result);

          // Route based on role
          if (state.isAdmin()) {
            window.location.hash = '#/admin/dashboard';
          } else {
            window.location.hash = '#/dashboard/devices';
          }
        } else {
          throw new Error('Đăng nhập thất bại. Không nhận được mã truy cập.');
        }
      } catch (err) {
        errorAlert.textContent = err.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.';
        errorAlert.classList.remove('d-none');
        loginBtn.disabled = false;
        loginBtn.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> Đăng nhập`;
      }
    });
  }
};
