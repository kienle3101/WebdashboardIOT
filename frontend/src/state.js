// State management and API client for SmartHouse Mini

const API_BASE_URL = 'http://localhost:8080/api/v1/smartHouse';

export const state = {
  token: localStorage.getItem('token') || null,
  user: null,

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  setUser(user) {
    this.user = user;
  },

  logout() {
    this.setToken(null);
    this.user = null;
    window.location.hash = '#/login';
  },

  isAuthenticated() {
    return !!this.token;
  },

  isAdmin() {
    if (!this.user || !this.user.roles) return false;
    return this.user.roles.some(role => role.name === 'ADMIN');
  },

  getPermissions() {
    if (!this.user || !this.user.roles) return [];
    const perms = new Set();
    this.user.roles.forEach(role => {
      // Handle the nested structure from backend
      if (role.permissions && Array.isArray(role.permissions)) {
        role.permissions.forEach(p => perms.add(p.name));
      }
    });
    return Array.from(perms);
  },

  hasPermission(permissionName) {
    if (this.isAdmin()) return true;
    return this.getPermissions().includes(permissionName);
  }
};

// API Fetch Helper
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (state.token) {
    headers['Authorization'] = `Bearer ${state.token}`;
  }

  const fetchOptions = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, fetchOptions);
    
    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        state.logout();
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw new Error(data.message || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}
