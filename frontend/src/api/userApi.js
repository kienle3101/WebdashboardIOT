import axiosClient from './axiosClient';

const unwrapResponse = (response) => {
  return response?.data?.result ?? response?.result ?? response?.data ?? response;
};

const getContent = (response) => {
  const result = unwrapResponse(response);

  if (Array.isArray(result)) return result;

  return result?.content ?? [];
};

const getRoleName = (roles) => {
  if (!Array.isArray(roles) || roles.length === 0) return 'USER';

  const hasAdmin = roles.some((role) => role?.name === 'ADMIN');

  if (hasAdmin) return 'ADMIN';

  return roles[0]?.name ?? 'USER';
};

const getPermissionNames = (permissions) => {
  if (!Array.isArray(permissions)) return [];

  return permissions
    .map((permission) => {
      if (typeof permission === 'string') return permission;
      return permission?.name;
    })
    .filter(Boolean);
};

export const normalizeUser = (user) => {
  if (!user) return null;

  return {
    ...user,
    id: user.id,
    username: user.username ?? '',
    fullName: user.fullName ?? '',
    role: user.role ?? getRoleName(user.roles),
    permissions: getPermissionNames(user.permissions),
  };
};

export const getUsers = async (params = {}) => {
  const response = await axiosClient.get('/users', {
    params: {
      pageNo: 1,
      pageSize: 100,
      ...params,
    },
  });

  return getContent(response).map(normalizeUser).filter(Boolean);
};

export const deleteUser = async (payload) => {
  const userId = typeof payload === 'object' ? payload.id : payload;

  if (!userId) {
    throw new Error('Không tìm thấy userId để xóa.');
  }

  const response = await axiosClient.delete(`/users/${encodeURIComponent(userId)}`);

  return unwrapResponse(response);
};

export const updateUserPermissions = async (payload) => {
  const userId = payload?.id;
  const permissions = payload?.permissions ?? [];

  if (!userId) {
    throw new Error('Không tìm thấy userId để phân quyền.');
  }

  const response = await axiosClient.patch(
    `/users/${encodeURIComponent(userId)}/permissions`,
    {
      permissions,
    }
  );

  return normalizeUser(unwrapResponse(response));
};