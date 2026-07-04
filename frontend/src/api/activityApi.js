import axiosClient from './axiosClient';

const normalizeList = (payload) => payload?.data ?? payload ?? [];

export const getAdminDashboardStats = async () => {
  // TODO: replace with real endpoint
  return {
    totalUsers: 128,
    totalDevices: 42,
    activeDevices: 31,
    todayActions: 184,
  };
  // return axiosClient.get('/api/dashboard/admin-stats').then((res) => normalizeList(res.data));
};

export const getWeeklyActivity = async () => {
  // TODO: replace with real endpoint
  return [
    { day: 'T2', count: 18 },
    { day: 'T3', count: 24 },
    { day: 'T4', count: 17 },
    { day: 'T5', count: 29 },
    { day: 'T6', count: 22 },
    { day: 'T7', count: 35 },
    { day: 'CN', count: 26 },
  ];
  // return axiosClient.get('/api/dashboard/weekly-activity').then((res) => normalizeList(res.data));
};

export const getActivityLogs = async ({ pageNo = 1, pageSize = 10, scope = 'all', limit } = {}) => {
  // TODO: replace with real endpoint
  const data = [
    { id: 1, time: '2026-06-30 08:30', user: 'Admin', device: 'Đèn phòng khách', action: 'Bật', source: 'App', result: 'Thành công' },
    { id: 2, time: '2026-06-30 08:15', user: 'Nguyễn Văn A', device: 'Quạt trần', action: 'Tắt', source: 'Voice', result: 'Thành công' },
    { id: 3, time: '2026-06-30 07:55', user: 'Trần Thị B', device: 'Cửa chính', action: 'Mở', source: 'App', result: 'Thành công' },
    { id: 4, time: '2026-06-30 07:40', user: 'Admin', device: 'Khóa cửa', action: 'Khóa', source: 'App', result: 'Thành công' },
    { id: 5, time: '2026-06-30 07:10', user: 'Nguyễn Văn A', device: 'Đèn phòng khách', action: 'Tắt', source: 'Schedule', result: 'Thành công' },
    { id: 6, time: '2026-06-29 22:45', user: 'Admin', device: 'Quạt trần', action: 'Bật', source: 'App', result: 'Thành công' },
    { id: 7, time: '2026-06-29 22:20', user: 'Trần Thị B', device: 'Cửa chính', action: 'Đóng', source: 'App', result: 'Thành công' },
  ];

  if (limit !== undefined) {
    return limit ? data.slice(0, limit) : data;
  }

  const total = data.length;
  const start = (pageNo - 1) * pageSize;
  const pagedData = data.slice(start, start + pageSize);

  return {
    data: pagedData,
    total,
    pageNo,
    pageSize,
  };
  // if (scope === 'me') return axiosClient.get('/api/activity-logs/me', { params: { pageNo, pageSize } }).then((res) => normalizeList(res.data));
  // return axiosClient.get('/api/activity-logs', { params: { pageNo, pageSize } }).then((res) => normalizeList(res.data));
};
