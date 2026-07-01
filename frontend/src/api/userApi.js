import axiosClient from './axiosClient';

const normalizeList = (payload) => payload?.data ?? payload ?? [];

export const getUsers = async () => {
  // TODO: replace with real endpoint
  return [
    {
      id: 1,
      username: 'admin',
      fullName: 'Admin SmartHouse',
      role: 'ADMIN',
      permissions: ['DEVICE_LIGHT', 'DEVICE_FAN', 'DEVICE_DOOR', 'DEVICE_LOCKER'],
    },
    {
      id: 2,
      username: 'user1',
      fullName: 'Nguyễn Văn A',
      role: 'USER',
      permissions: ['DEVICE_LIGHT'],
    },
    {
      id: 3,
      username: 'user2',
      fullName: 'Trần Thị B',
      role: 'USER',
      permissions: ['DEVICE_FAN'],
    },
  ];
  // return axiosClient.get('/api/users').then((res) => normalizeList(res.data));
};

export const deleteUser = async (id) => {
  // TODO: replace with real endpoint
  return { success: true, id };
  // return axiosClient.delete(`/api/users/${id}`);
};

export const updateUserPermissions = async (id, permissions) => {
  // TODO: replace with real endpoint
  return { success: true, id, permissions };
  // return axiosClient.put(`/api/users/${id}/permissions`, { permissions });
};
