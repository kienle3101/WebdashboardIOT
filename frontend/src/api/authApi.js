import axiosClient from './axiosClient';

const normalizeAuthResponse = (payload) => {
  if (payload?.data?.result !== undefined) return payload.data.result;
  if (payload?.result !== undefined) return payload.result;
  if (payload?.data !== undefined) return payload.data;
  return payload;
};

export const register = async ({ fullName, username, password }) => {
  const response = await axiosClient.post('/users', { fullName, username, password });
  return normalizeAuthResponse(response);
};

export const login = async ({ username, password }) => {
  const tokenPayload = await axiosClient.post('/auth/token', { username, password }).then(normalizeAuthResponse);
  const token = tokenPayload?.token ?? tokenPayload?.accessToken ?? null;

  if (!token) {
    throw new Error('Không nhận được token từ server.');
  }

  localStorage.setItem('smartHouseToken', token);

  const user = await axiosClient.get('/users/myInfo').then(normalizeAuthResponse);
  if (user) {
    localStorage.setItem('smartHouseUser', JSON.stringify(user));
  }

  return {
    token,
    authenticated: true,
    user,
  };
};

export const logout = async () => {
  localStorage.removeItem('smartHouseToken');
  localStorage.removeItem('smartHouseUser');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('smartHouseToken');
  if (!token) return null;

  try {
    const user = await axiosClient.get('/users/myInfo').then(normalizeAuthResponse);
    if (user) {
      localStorage.setItem('smartHouseUser', JSON.stringify(user));
    }
    return user;
  } catch (error) {
    if (error.response?.status === 401) {
      await logout();
      return null;
    }
    throw error;
  }
};
