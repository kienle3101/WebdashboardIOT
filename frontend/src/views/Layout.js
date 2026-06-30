import { state } from '../state.js';

export const Layout = {
  render(contentHtml, activeRoute) {
    const isUserAdmin = state.isAdmin();
    const fullName = state.user?.fullName || 'Người dùng';
    const roleText = isUserAdmin ? 'Quản trị viên' : 'Người dùng';
    
    // Sidebar items based on role
    const menuItems = isUserAdmin ? [
      { id: 'overview', label: 'Tổng quan', icon: 'bi-grid-fill', hash: '#/admin/dashboard' },
      { id: 'devices', label: 'Thiết bị', icon: 'bi-cpu-fill', hash: '#/devices' },
      { id: 'users', label: 'Người dùng', icon: 'bi-people-fill', hash: '#/admin/users' },
      { id: 'permissions', label: 'Phân quyền thiết bị', icon: 'bi-shield-lock-fill', hash: '#/admin/permissions' },
      { id: 'history', label: 'Lịch sử sử dụng', icon: 'bi-clock-history', hash: '#/admin/history' },
      { id: 'sensor', label: 'Cảm biến', icon: 'bi-activity', hash: '#/admin/sensors' },
      { id: 'account', label: 'Tài khoản', icon: 'bi-person-badge-fill', hash: '#/admin/account' }
    ] : [
      { id: 'overview', label: 'Tổng quan', icon: 'bi-grid-fill', hash: '#/dashboard/devices' },
      { id: 'my-devices', label: 'Thiết bị của tôi', icon: 'bi-cpu-fill', hash: '#/dashboard/devices' },
      { id: 'history', label: 'Lịch sử hôm nay', icon: 'bi-clock-history', hash: '#/dashboard/history' },
      { id: 'account', label: 'Tài khoản', icon: 'bi-person-badge-fill', hash: '#/dashboard/account' }
    ];

    // Determine current breadcrumbs
    let breadcrumbHtml = '';
    if (isUserAdmin) {
      breadcrumbHtml = `<li class="breadcrumb-item text-muted">Trang quản trị</li>`;
      if (activeRoute.includes('dashboard')) {
        breadcrumbHtml += `<li class="breadcrumb-item active text-primary fw-semibold" aria-current="page">Tổng quan</li>`;
      } else if (activeRoute.includes('users')) {
        breadcrumbHtml += `<li class="breadcrumb-item active text-primary fw-semibold" aria-current="page">Người dùng</li>`;
      } else if (activeRoute.includes('devices')) {
        breadcrumbHtml += `<li class="breadcrumb-item active text-primary fw-semibold" aria-current="page">Thiết bị của tôi</li>`;
      } else if (activeRoute.includes('permissions')) {
        breadcrumbHtml += `<li class="breadcrumb-item active text-primary fw-semibold" aria-current="page">Phân quyền</li>`;
      } else {
        breadcrumbHtml += `<li class="breadcrumb-item active text-primary fw-semibold" aria-current="page">Chi tiết</li>`;
      }
    } else {
      breadcrumbHtml = `<li class="breadcrumb-item text-muted">Người dùng</li>`;
      breadcrumbHtml += `<li class="breadcrumb-item active text-primary fw-semibold" aria-current="page">Thiết bị của tôi</li>`;
    }

    return `
      <div class="d-flex min-vh-100 bg-light-gray">
        <!-- Sidebar -->
        <aside class="sidebar bg-white border-end d-flex flex-column justify-content-between position-fixed h-100 z-3 transition" id="layout-sidebar" style="width: 260px; left: 0; top: 0;">
          <div>
            <!-- Sidebar Header -->
            <div class="sidebar-header d-flex align-items-center justify-content-between p-4 border-bottom">
              <div class="d-flex align-items-center gap-2">
                <div class="logo-icon bg-primary text-white rounded-3 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px; font-size: 20px;">
                  <i class="bi bi-house-door-fill"></i>
                </div>
                <h5 class="fw-bold mb-0 text-dark">SmartHouse Mini</h5>
              </div>
              <button class="btn btn-sm btn-light border d-lg-none" id="close-sidebar-btn">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <!-- Sidebar Navigation -->
            <nav class="sidebar-nav p-3">
              <ul class="nav nav-pills flex-column gap-1">
                ${menuItems.map(item => {
                  const isActive = activeRoute === item.hash;
                  return `
                    <li class="nav-item">
                      <a href="${item.hash}" class="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 border-0 transition ${isActive ? 'active bg-primary text-white' : 'text-secondary hover-bg-light'}" style="font-size: 14px;">
                        <i class="bi ${item.icon} fs-5"></i>
                        <span>${item.label}</span>
                      </a>
                    </li>
                  `;
                }).join('')}
              </ul>
            </nav>
          </div>

          <!-- Sidebar Footer -->
          <div class="sidebar-footer p-3 m-3 bg-light rounded-4 text-center">
            <img src="/src/assets/logo.svg" alt="App Logo" class="mb-2" style="width: 48px; height: 48px; onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22 viewBox=%220 0 24 24%22 fill=%22%230d6efd%22><path d=%22M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5l6 5.4V18H6v-5.1l6-5.4z%22/></svg>'">
            <h6 class="fw-bold mb-1" style="font-size: 13px;">SmartHouse Mini</h6>
            <div class="text-muted" style="font-size: 10px; line-height: 1.4;">Hệ thống quản lý nhà thông minh<br>phiên bản 1.0.0</div>
          </div>
        </aside>

        <!-- Sidebar Overlay for mobile -->
        <div class="sidebar-overlay position-fixed w-100 h-100 bg-dark bg-opacity-50 z-2 d-none" id="sidebar-overlay"></div>

        <!-- Main Content Area -->
        <div class="flex-grow-1" style="margin-left: 260px; min-width: 0;" id="layout-main-content">
          <!-- Top Header -->
          <header class="topbar sticky-top bg-white border-bottom px-4 py-3 d-flex align-items-center justify-content-between z-1">
            <div class="d-flex align-items-center gap-3">
              <button class="btn btn-light border rounded-3 px-2 py-1" id="toggle-sidebar-btn">
                <i class="bi bi-list fs-5"></i>
              </button>
              
              <!-- Breadcrumb -->
              <nav aria-label="breadcrumb" class="d-none d-md-block">
                <ol class="breadcrumb mb-0 align-items-center" style="font-size: 14px;">
                  <li class="breadcrumb-item"><i class="bi bi-house-door-fill text-muted"></i></li>
                  ${breadcrumbHtml}
                </ol>
              </nav>
            </div>

            <!-- Search and User Profile -->
            <div class="d-flex align-items-center gap-3">
              <!-- Search bar -->
              <div class="search-bar position-relative d-none d-sm-block" style="width: 250px;">
                <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input type="text" class="form-control form-control-sm bg-light border-0 ps-5 rounded-pill" placeholder="Tìm kiếm thiết bị, người dùng...">
              </div>

              <!-- Notifications -->
              <div class="dropdown">
                <button class="btn btn-light border-0 rounded-circle position-relative p-2" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-bell-fill text-secondary fs-5"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style="padding: 3px 6px; font-size: 9px;">3</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2 rounded-3" style="width: 280px; font-size: 13px;">
                  <li class="dropdown-header fw-bold text-dark border-bottom pb-2">Thông báo mới nhất</li>
                  <li><a class="dropdown-item py-2 border-bottom text-wrap" href="#"><i class="bi bi-info-circle text-primary me-2"></i> Hệ thống đã thiết lập kết nối thành công với bộ điều khiển.</a></li>
                  <li><a class="dropdown-item py-2 border-bottom text-wrap" href="#"><i class="bi bi-exclamation-triangle-fill text-warning me-2"></i> Thiết bị Cửa tự động được mở lúc 10:24.</a></li>
                  <li><a class="dropdown-item py-2 text-wrap" href="#"><i class="bi bi-check-circle-fill text-success me-2"></i> Đã đồng bộ dữ liệu cảm biến mới.</a></li>
                </ul>
              </div>

              <!-- User Profile Dropdown -->
              <div class="dropdown">
                <div class="d-flex align-items-center gap-2 cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">
                  <div class="avatar rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center border" style="width: 38px; height: 38px; font-size: 16px;">
                    ${fullName.charAt(0).toUpperCase()}
                  </div>
                  <div class="user-details d-none d-md-block text-start" style="line-height: 1.2;">
                    <div class="fw-bold text-dark small">${fullName}</div>
                    <small class="text-muted" style="font-size: 11px;">${roleText}</small>
                  </div>
                  <i class="bi bi-chevron-down text-muted small d-none d-md-block"></i>
                </div>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3" style="font-size: 14px;">
                  <li><a class="dropdown-item py-2" href="#/admin/account"><i class="bi bi-person me-2"></i> Tài khoản của tôi</a></li>
                  <li><a class="dropdown-item py-2" href="#"><i class="bi bi-gear me-2"></i> Cấu hình hệ thống</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><button class="dropdown-item py-2 text-danger" id="logout-btn"><i class="bi bi-box-arrow-right me-2"></i> Đăng xuất</button></li>
                </ul>
              </div>
            </div>
          </header>

          <!-- Inner Page Content -->
          <main class="content-wrapper p-4">
            ${contentHtml}
          </main>
        </div>
      </div>
    `;
  },

  setupListeners() {
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('layout-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const logoutBtn = document.getElementById('logout-btn');

    // Sidebar Mobile Toggle
    if (toggleSidebarBtn && sidebar && overlay) {
      toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('show');
        overlay.classList.remove('d-none');
      });

      const closeSidebar = () => {
        sidebar.classList.remove('show');
        overlay.classList.add('d-none');
      };

      closeSidebarBtn.addEventListener('click', closeSidebar);
      overlay.addEventListener('click', closeSidebar);
    }

    // Logout
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        state.logout();
      });
    }
  }
};
