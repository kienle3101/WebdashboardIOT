import { useState } from 'react';
import {
  DoorClosed,
  Fan,
  Lightbulb,
  Lock,
  MoreVertical,
  Sun,
  Wind,
  Info,
  XCircle,
  X,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useDevices } from '../../hooks/useDevices';
import { useAuth } from '../../hooks/useAuth'; // trả về { user } với user.permissions

const deviceConfig = {
  LIGHT: { icon: Lightbulb, tint: '#2563eb', soft: '#eff6ff', metricIcon: Sun, metricLabel: 'Độ sáng', unit: '%' },
  FAN: { icon: Fan, tint: '#16a34a', soft: '#ecfdf5', metricIcon: Wind, metricLabel: 'Tốc độ', unit: '' },
  DOOR: { icon: DoorClosed, tint: '#64748b', soft: '#f1f5f9' },
  LOCKER: { icon: Lock, tint: '#64748b', soft: '#f1f5f9' },
};

const permissionKeyMap = {
  LIGHT: 'DEVICE_LIGHT',
  FAN: 'DEVICE_FAN',
  DOOR: 'DEVICE_DOOR',
  LOCKER: 'DEVICE_LOCKER',
};

function Toggle({ checked, disabled, onChange }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onChange}
      style={{
        width: 40,
        height: 22,
        borderRadius: 999,
        border: 'none',
        padding: 2,
        background: disabled ? '#e2e8f0' : checked ? '#2563eb' : '#cbd5e1',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        justifyContent: checked ? 'flex-end' : 'flex-start',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

export default function UserDevicesPage() {
  const { devices, toggleDevice } = useDevices();
  const { user } = useAuth();
  const [toast, setToast] = useState('Bạn không có quyền điều khiển thiết bị Cửa tự động');
  const [view, setView] = useState('grid');
  const [metrics, setMetrics] = useState({}); // { [deviceId]: value } - local cho slider, thay bằng API khi có

  const hasPermission = (device) => user?.permissions?.includes(permissionKeyMap[device.type]);

  const handleToggle = (device) => {
    if (!hasPermission(device)) {
      setToast(`Bạn không có quyền điều khiển thiết bị ${device.name}`);
      return;
    }
    toggleDevice({ id: device.id, status: device.status === 'ON' ? 'OFF' : 'ON' });
  };

  const getMetricValue = (device) => metrics[device.id] ?? device.metricValue ?? (device.type === 'FAN' ? 3 : 80);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Thiết bị của tôi</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Quản lý và điều khiển các thiết bị trong nhà</div>
        </div>

        {toast && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              background: '#fff',
              border: '1px solid #fecaca',
              borderRadius: 12,
              padding: '10px 14px',
              width: 320,
              boxShadow: '0 10px 25px rgba(239,68,68,0.10)',
              flexShrink: 0,
            }}
          >
            <XCircle size={20} color="#ef4444" fill="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#ef4444', fontSize: 13 }}>Từ chối thao tác</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{toast}</div>
            </div>
            <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button
          style={{
            padding: '8px 16px',
            borderRadius: 999,
            border: '1px solid #bfdbfe',
            background: '#eff6ff',
            color: '#2563eb',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Tất cả
        </button>

        <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
          <button
            onClick={() => setView('grid')}
            style={{
              width: 34,
              height: 32,
              display: 'grid',
              placeItems: 'center',
              border: 'none',
              cursor: 'pointer',
              background: view === 'grid' ? '#2563eb' : '#fff',
              color: view === 'grid' ? '#fff' : '#94a3b8',
            }}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView('list')}
            style={{
              width: 34,
              height: 32,
              display: 'grid',
              placeItems: 'center',
              border: 'none',
              borderLeft: '1px solid #e2e8f0',
              cursor: 'pointer',
              background: view === 'list' ? '#2563eb' : '#fff',
              color: view === 'list' ? '#fff' : '#94a3b8',
            }}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: view === 'grid' ? 'repeat(3, minmax(0, 1fr))' : '1fr',
          gap: 16,
        }}
      >
        {devices.map((device) => {
          const config = deviceConfig[device.type] ?? deviceConfig.DOOR;
          const Icon = config.icon;
          const MetricIcon = config.metricIcon;
          const locked = !hasPermission(device);
          const isOn = device.status === 'ON';
          const value = getMetricValue(device);

          return (
            <div
              key={device.id}
              style={{
                background: '#fff',
                border: '1px solid #eef0f3',
                borderRadius: 16,
                padding: 16,
                boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: config.soft,
                      display: 'grid',
                      placeItems: 'center',
                      color: config.tint,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{device.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{device.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: device.online ? '#16a34a' : '#94a3b8' }} />
                      <span style={{ fontSize: 11, color: device.online ? '#16a34a' : '#94a3b8', fontWeight: 600 }}>
                        {device.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: 2 }}>
                  <MoreVertical size={18} />
                </button>
              </div>

              {locked ? (
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    background: '#fef2f2',
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: '#fee2e2',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Lock size={14} color="#ef4444" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c' }}>Không có quyền điều khiển</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>Bạn chỉ có quyền xem thiết bị này</div>
                  </div>
                </div>
              ) : (
                MetricIcon && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MetricIcon size={14} color="#94a3b8" />
                      <span style={{ fontSize: 12, color: '#64748b' }}>{config.metricLabel}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                      <input
                        type="range"
                        min={0}
                        max={config.unit === '%' ? 100 : 5}
                        value={value}
                        onChange={(e) => setMetrics((prev) => ({ ...prev, [device.id]: Number(e.target.value) }))}
                        style={{ flex: 1, accentColor: config.tint }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', width: 28, textAlign: 'right' }}>
                        {value}
                        {config.unit}
                      </span>
                    </div>
                  </div>
                )
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>Trạng thái</span>
                  {locked && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '2px 8px',
                        borderRadius: 999,
                      }}
                    >
                      {isOn ? 'Mở' : 'Đóng'}
                    </span>
                  )}
                </div>
                <Toggle checked={isOn} disabled={locked} onChange={() => handleToggle(device)} />
              </div>

              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>Cập nhật: {device.updatedAt}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 20,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
          background: '#eff6ff',
          border: '1px solid #dbeafe',
          borderRadius: 14,
          padding: 14,
        }}
      >
        <Info size={18} color="#2563eb" style={{ marginTop: 1, flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#1e3a8a' }}>Bạn có thể xem tất cả thiết bị trong hệ thống.</div>
          <div style={{ fontSize: 12, color: '#1e40af', marginTop: 2 }}>
            Một số thiết bị có thể bị hạn chế điều khiển tùy theo quyền của bạn.
          </div>
        </div>
      </div>
    </div>
  );
}