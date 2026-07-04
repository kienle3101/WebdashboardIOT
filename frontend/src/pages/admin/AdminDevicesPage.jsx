import { useMemo, useState } from 'react';
import DeviceControlPanel from '../../components/DeviceControlPanel';
import { useDevices } from '../../hooks/useDevices';

const deviceOptions = [
  { value: 'DOOR', label: 'Cửa', currentStatus: 'CLOSED' },
  { value: 'LIGHT', label: 'Đèn', currentStatus: 'OFF' },
  { value: 'FAN', label: 'Quạt', currentStatus: 'OFF' },
];

export default function AdminDevicesPage() {
  const { devices, toggleDevice, createDevice, isLoading, isCreating } = useDevices();
  const [selectedDevice, setSelectedDevice] = useState(deviceOptions[0].value);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedOption = useMemo(
    () => deviceOptions.find((item) => item.value === selectedDevice) ?? deviceOptions[0],
    [selectedDevice]
  );

  const handleAddDevice = async () => {
    setMessage('');
    setError('');

    try {
      await createDevice({
        deviceCode: selectedOption.value,
        deviceName: selectedOption.label,
        deviceType: selectedOption.value,
        currentStatus: selectedOption.currentStatus,
      });
      setMessage(`Đã thêm thiết bị ${selectedOption.label} thành công.`);
      setIsModalOpen(false);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Không thể thêm thiết bị');
    }
  };

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Thiết bị của tôi</div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>Quản lý và điều khiển thiết bị qua API backend</div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '12px 18px',
            borderRadius: 14,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Thêm thiết bị
        </button>
      </div>

      {message && (
        <div style={{ borderRadius: 14, padding: 14, background: '#ecfdf5', color: '#166534', border: '1px solid #d1fae5' }}>{message}</div>
      )}
      {error && (
        <div style={{ borderRadius: 14, padding: 14, background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>{error}</div>
      )}

      <DeviceControlPanel devices={devices} onToggle={toggleDevice} loading={isLoading} hideTitle />

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.56)',
            display: 'grid',
            placeItems: 'center',
            padding: 20,
            zIndex: 50,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 500,
              borderRadius: 24,
              background: '#fff',
              padding: 28,
              boxShadow: '0 30px 80px rgba(15, 23, 42, 0.18)',
              display: 'grid',
              gap: 24,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Thêm thiết bị mới</div>
                <div style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>Chọn thiết bị để thêm vào hệ thống.</div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#475569',
                  fontSize: 20,
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              {deviceOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDevice(option.value)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 18,
                    border: selectedDevice === option.value ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: selectedDevice === option.value ? '#eff6ff' : '#fff',
                    color: '#0f172a',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  color: '#475569',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleAddDevice}
                disabled={isCreating}
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  border: 'none',
                  background: '#2563eb',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: isCreating ? 'not-allowed' : 'pointer',
                }}
              >
                {isCreating ? 'Đang thêm...' : 'Xác nhận thêm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
