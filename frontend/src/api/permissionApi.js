import axiosClient, { extractApiResult, getFriendlyErrorMessage } from './axiosClient';

export const updateUserPermissions = async (userId, permissions) => {
  try {
    const response = await axiosClient.patch(`/users/${encodeURIComponent(userId)}/permissions`, { permissions });
    return extractApiResult(response);
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn');
    }
    if (error.response?.status === 403) {
      throw new Error('Bạn không có quyền phân quyền user');
    }
    throw new Error(getFriendlyErrorMessage(error, 'Cập nhật quyền thất bại'));
  }
};
