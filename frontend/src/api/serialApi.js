import axiosClient from './axiosClient';

const normalizeResult = (payload) => payload?.result ?? payload?.data?.result ?? payload?.data ?? payload;

export const getSerialStatus = async () => {
  const response = await axiosClient.get('/serial/status');
  return normalizeResult(response.data);
};

export const connectSerial = async () => {
  const response = await axiosClient.post('/serial/connect');
  return normalizeResult(response.data);
};

export const disconnectSerial = async () => {
  const response = await axiosClient.post('/serial/disconnect');
  return normalizeResult(response.data);
};
