import { useState } from 'react';
import { DoorClosed, Fan, Lightbulb, Lock, Power } from 'lucide-react';

const icons = {
  LIGHT: Lightbulb,
  FAN: Fan,
  DOOR: DoorClosed,
};

const typeNames = {
  LIGHT: 'Đèn',
  FAN: 'Quạt',
  DOOR: 'Cửa',
};

const statusLabels = {
  LIGHT: { ON: 'Bật', OFF: 'Tắt' },
  FAN: { ON: 'Bật', OFF: 'Tắt' },
  DOOR: { OPEN: 'Mở', CLOSED: 'Đóng' },
};

const actionLabels = {
  LIGHT: { ON: 'Tắt', OFF: 'Bật' },
  FAN: { ON: 'Tắt', OFF: 'Bật' },
  DOOR: { OPEN: 'Đóng', CLOSED: 'Mở' },
};

const statusStyles = {
  ON: { label: 'Đang bật', color: '#16a34a', background: '#ecfdf5' },
  OFF: { label: 'Tắt', color: '#64748b', background: '#f8fafc' },
  OPEN: { label: 'Mở', color: '#2563eb', background: '#e0f2fe' },
  CLOSED: { label: 'Đóng', color: '#64748b', background: '#f8fafc' },
};

export default function DeviceControlPanel({ devices = [], onToggle, loading, hideTitle = false }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleControl = async (device) => {
    if (device.hasPermission === false) {
      setError(`Bạn không có quyền truy cập thiết bị ${device.deviceName}`);
      return;
    }

    setError('');

    try {
      const result = await onToggle(device);
      if (result?.message) {
        setMessage(result.message);
      } else {
        setMessage('Điều khiển thiết bị thành công.');
      }
    } catch (err) {
      setMessage('');
      setError(err?.response?.data?.message || err.message || 'Không thể điều khiển thiết bị');
    }
  };

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {!hideTitle && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Thiết bị của tôi</div>
            <div style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>Quản lý và điều khiển thiết bị qua API backend</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
        {devices.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: 24, borderRadius: 18, background: '#f8fafc', color: '#64748b' }}>
            Không có thiết bị nào để hiển thị.
          </div>
        ) : (
          devices.map((device) => {
            const deviceType = device.deviceType || device.deviceCode;
            const Icon = icons[deviceType] || Power;
            const currentStatus = device.currentStatus || 'OFF';
            const statusInfo = statusStyles[currentStatus] || statusStyles.OFF;
            const actionLabel = actionLabels[deviceType]?.[currentStatus] || 'Chuyển';
            const typeLabel = typeNames[deviceType] || deviceType;
            const hasPermission = device.hasPermission !== false;

            return (
              <div
                key={device.id}
                style={{
                  borderRadius: 20,
                  border: '1px solid #e2e8f0',
                  padding: 20,
                  background: '#fff',
                  boxShadow: '0 14px 32px rgba(15,23,42,0.06)',
                  display: 'grid',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        display: 'grid',
                        placeItems: 'center',
                        background: '#eef2ff',
                        color: '#4338ca',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{device.deviceName}</div>
                      <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {typeLabel}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: statusInfo.color }}>{statusInfo.label}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{device.deviceCode}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: hasPermission ? '#f8fafc' : '#fef2f2',
                    border: hasPermission ? '1px solid #dbeafe' : '1px solid #fecaca',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, color: hasPermission ? '#0f172a' : '#991b1b', fontWeight: 700 }}>
                      {hasPermission ? 'Đã cấp quyền' : 'Không có quyền'}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                      {hasPermission ? 'Bạn có thể điều khiển thiết bị này' : 'Bạn chỉ có thể xem trạng thái.'}
                    </div>
                  </div>
                  {!hasPermission && (
                    <Lock size={18} color="#991b1b" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleControl(device)}
                  disabled={loading || !hasPermission}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: 'none',
                    cursor: !hasPermission ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    color: '#fff',
                    background: !hasPermission ? '#94a3b8' : '#2563eb',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Đang xử lý...' : actionLabel}
                </button>
              </div>
            );
          })
        )}
      </div>

      {message && (
        <div style={{ borderRadius: 14, padding: 16, background: '#ecfdf5', color: '#166534', border: '1px solid #d1fae5' }}>{message}</div>
      )}
      {error && (
        <div style={{ borderRadius: 14, padding: 16, background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>{error}</div>
      )}
    </div>
  );
}
