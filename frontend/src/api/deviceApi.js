import axiosClient from './axiosClient';

const normalizeResult = (payload) => payload?.result ?? payload?.data?.result ?? payload?.data ?? payload;

const normalizeDeviceList = (payload) => {
  const list = payload?.result ?? payload?.data?.result ?? payload?.data ?? payload;
  if (!Array.isArray(list)) return [];
  return list.filter((device) => device.deviceCode !== 'LOCKER' && device.deviceType !== 'LOCKER');
};

export const getDevices = async () => {
  const response = await axiosClient.get('/devices');
  return normalizeDeviceList(response.data);
};

const buildTargetStatus = (deviceType, currentStatus) => {
  if (deviceType === 'DOOR') {
    return currentStatus === 'OPEN' ? 'CLOSED' : 'OPEN';
  }
  return currentStatus === 'ON' ? 'OFF' : 'ON';
};

export const toggleDeviceState = async ({ deviceCode, deviceType, currentStatus }) => {
  const targetStatus = buildTargetStatus(deviceType, currentStatus);
  const response = await axiosClient.post(`/devices/code/${encodeURIComponent(deviceCode)}/control`, {
    targetStatus,
    source: 'WEB',
  });
  return normalizeResult(response.data);
};

export const createDevice = async ({ deviceCode, deviceName, deviceType, currentStatus }) => {
  const response = await axiosClient.post('/devices', {
    deviceCode,
    deviceName,
    deviceType,
    currentStatus,
  });
  return normalizeResult(response.data);
};
