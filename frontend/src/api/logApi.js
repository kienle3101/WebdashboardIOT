import axiosClient, { extractApiResult, getFriendlyErrorMessage } from './axiosClient';

export const getAllLogs = async (pageNo = 0, pageSize = 10) => {
  try {
    const response = await axiosClient.get('/logs', { params: { pageNo, pageSize } });
    return extractApiResult(response);
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn');
    }
    if (error.response?.status === 403) {
      throw new Error('Bạn không có quyền xem lịch sử hệ thống');
    }
    throw new Error(getFriendlyErrorMessage(error, 'Không thể tải lịch sử sử dụng'));
  }
};

export const getMyLogs = async (pageNo = 0, pageSize = 10) => {
  try {
    const response = await axiosClient.get('/logs/myLogs', { params: { pageNo, pageSize } });
    return extractApiResult(response);
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn');
    }
    if (error.response?.status === 403) {
      throw new Error('Bạn không có quyền xem lịch sử của mình');
    }
    throw new Error(getFriendlyErrorMessage(error, 'Không thể tải lịch sử của bạn'));
  }
};
