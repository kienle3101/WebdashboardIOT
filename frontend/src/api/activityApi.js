import axiosClient from './axiosClient';

const unwrapResponse = (payload) => {
  return payload?.data?.result ?? payload?.result ?? payload?.data ?? payload;
};

const normalizePage = (payload) => {
  const result = unwrapResponse(payload);

  if (Array.isArray(result)) {
    return {
      content: result,
      pageNo: 1,
      pageSize: result.length,
      totalElements: result.length,
      totalPages: 1,
      last: true,
    };
  }

  return {
    content: result?.content ?? [],
    pageNo: result?.pageNo ?? 1,
    pageSize: result?.pageSize ?? 10,
    totalElements: result?.totalElements ?? result?.content?.length ?? 0,
    totalPages: result?.totalPages ?? 1,
    last: result?.last ?? true,
  };
};

const formatDateTime = (value) => {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString('vi-VN', {
    hour12: false,
  });
};

const actionLabelMap = {
  LIGHT_ON: 'Bật',
  LIGHT_OFF: 'Tắt',
  FAN_ON: 'Bật',
  FAN_OFF: 'Tắt',
  DOOR_OPEN: 'Mở',
  DOOR_CLOSE: 'Đóng',
};

const resultLabelMap = {
  SUCCESS: 'Thành công',
  FAILED: 'Thất bại',
};

const normalizeLog = (log) => {
  if (!log) return null;

  return {
    ...log,
    time: formatDateTime(log.createdAt),
    user: log.fullName || log.username || 'Không rõ',
    device: log.deviceName || log.deviceCode || 'Không rõ',
    action: actionLabelMap[log.action] ?? log.action ?? 'Không rõ',
    source: log.source ?? 'WEB',
    result: resultLabelMap[log.result] ?? log.result ?? 'Không rõ',
  };
};

const fetchPageContent = async (url, params = {}) => {
  const response = await axiosClient.get(url, { params });
  return normalizePage(response).content;
};

export const getActivityLogs = async ({
  pageNo = 1,
  pageSize = 10,
  scope = 'all',
  limit,
} = {}) => {
  const endpoint = scope === 'me' ? '/logs/myLogs' : '/logs';

  const response = await axiosClient.get(endpoint, {
    params: {
      pageNo,
      pageSize: limit ?? pageSize,
    },
  });

  const page = normalizePage(response);
  const logs = page.content.map(normalizeLog).filter(Boolean);

  if (limit !== undefined) {
    return logs.slice(0, limit);
  }

  return {
    data: logs,
    total: page.totalElements,
    pageNo: page.pageNo,
    pageSize: page.pageSize,
    totalPages: page.totalPages,
    last: page.last,
  };
};

export const getAdminDashboardStats = async () => {
  const [usersResult, devicesResult, logsResult] = await Promise.allSettled([
    fetchPageContent('/users', { pageNo: 0, pageSize: 100 }),
    fetchPageContent('/devices'),
    fetchPageContent('/logs', { pageNo: 1, pageSize: 200 }),
  ]);

  const users = usersResult.status === 'fulfilled' ? usersResult.value : [];
  const devices = devicesResult.status === 'fulfilled' ? devicesResult.value : [];
  const logs = logsResult.status === 'fulfilled' ? logsResult.value : [];

  const today = new Date().toISOString().slice(0, 10);

  const activeDevices = devices.filter((device) => {
    const status = device.currentStatus ?? device.status;
    return status === 'ON' || status === 'OPEN';
  }).length;

  const todayActions = logs.filter((log) => {
    return String(log.createdAt ?? '').slice(0, 10) === today;
  }).length;

  return {
    totalUsers: users.length,
    totalDevices: devices.length,
    activeDevices,
    todayActions,
  };
};

export const getWeeklyActivity = async () => {
  const logs = await fetchPageContent('/logs', {
    pageNo: 1,
    pageSize: 200,
  });

  const dayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const counts = new Map();

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(todayStart);
    date.setDate(todayStart.getDate() - offset);
    counts.set(date.toISOString().slice(0, 10), 0);
  }

  logs.forEach((log) => {
    if (!log.createdAt) return;

    const date = new Date(log.createdAt);
    if (Number.isNaN(date.getTime())) return;

    const key = date.toISOString().slice(0, 10);

    if (counts.has(key)) {
      counts.set(key, counts.get(key) + 1);
    }
  });

  return Array.from(counts.entries()).map(([dateKey, count]) => {
    const date = new Date(dateKey);
    return {
      day: dayLabels[date.getDay()],
      count,
    };
  });
};