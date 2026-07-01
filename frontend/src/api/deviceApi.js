import axiosClient from './axiosClient';

const normalizeList = (payload) => payload?.data ?? payload ?? [];

export const getDevices = async () => {
  // TODO: replace with real endpoint
  return [
    { id: 1, name: 'Đèn phòng khách', type: 'LIGHT', status: 'ON', online: true, location: 'Phòng khách', permission: 'DEVICE_LIGHT' },
    { id: 2, name: 'Quạt trần', type: 'FAN', status: 'ON', online: true, location: 'Phòng ngủ', permission: 'DEVICE_FAN' },
    { id: 3, name: 'Cửa chính', type: 'DOOR', status: 'OFF', online: false, location: 'Cửa vào', permission: 'DEVICE_DOOR' },
    { id: 4, name: 'Khóa cửa', type: 'LOCKER', status: 'OFF', online: true, location: 'Cửa sau', permission: 'DEVICE_LOCKER' },
  ];
  // return axiosClient.get('/api/devices').then((res) => normalizeList(res.data));
};

export const toggleDeviceState = async (id, status) => {
  // TODO: replace with real endpoint
  return { id, status };
  // return axiosClient.patch(`/api/devices/${id}/state`, { status });
};
