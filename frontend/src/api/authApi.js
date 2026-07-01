import axiosClient from './axiosClient';

const normalizeAuthResponse = (payload) => {
  if (payload?.data) return payload.data;
  return payload;
};

export const login = async ({ username, password }) => {
  // TODO: replace with real endpoint
  return Promise.resolve({
    data: {
      token: 'mock-jwt-token',
      user: {
        id: 1,
        username,
        fullName: username === 'admin' ? 'Admin SmartHouse' : 'Nguyễn Văn A',
        role: username === 'admin' ? 'ADMIN' : 'USER',
        permissions: username === 'admin'
          ? ['DEVICE_LIGHT', 'DEVICE_FAN', 'DEVICE_DOOR', 'DEVICE_LOCKER']
          : ['DEVICE_LIGHT'],
      },
    },
  });
  // return axiosClient.post('/api/auth/login', { username, password }).then(normalizeAuthResponse);
};

export const logout = async () => {
  localStorage.removeItem('smartHouseToken');
  localStorage.removeItem('smartHouseUser');
};

export const getCurrentUser = async () => {
  // TODO: replace with real endpoint
  const user = JSON.parse(localStorage.getItem('smartHouseUser') || 'null');
  return user;
  // return axiosClient.get('/api/auth/me').then(normalizeAuthResponse);
};
