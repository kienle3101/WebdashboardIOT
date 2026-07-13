import axiosClient from './axiosClient';

const normalizeResult = (payload) => payload?.result ?? payload?.data?.result ?? payload?.data ?? payload;

// Phân tích câu lệnh tiếng Việt thành {deviceCode, targetStatus}
export function parseVoiceCommand(text) {
  const lower = text.toLowerCase();

  let deviceCode = null;
  if (lower.includes('đèn')) deviceCode = 'LIGHT';
  else if (lower.includes('quạt')) deviceCode = 'FAN';
  else if (lower.includes('cửa')) deviceCode = 'DOOR';

  if (!deviceCode) return null;

  let targetStatus = null;
  if (lower.includes('bật') || lower.includes('mở')) {
    targetStatus = deviceCode === 'DOOR' ? 'OPEN' : 'ON';
  } else if (lower.includes('tắt') || lower.includes('đóng')) {
    targetStatus = deviceCode === 'DOOR' ? 'CLOSED' : 'OFF';
  }

  if (!targetStatus) return null;

  return { deviceCode, targetStatus };
}

// Gọi lại đúng endpoint điều khiển thiết bị đã có, chỉ đổi source
export const controlDeviceByVoice = async ({ deviceCode, targetStatus }) => {
  const response = await axiosClient.post(
    `/devices/code/${encodeURIComponent(deviceCode)}/control`,
    {
      targetStatus,
      source: 'VOICE',
    }
  );
  return normalizeResult(response.data);
};