import { DoorOpen, Fan, Lightbulb, Lock, Power, Wifi, WifiOff } from 'lucide-react';
import { useDevices } from '../../hooks/useDevices';

const iconMap = {
  LIGHT: Lightbulb,
  FAN: Fan,
  DOOR: DoorOpen,
  LOCKER: Lock,
};

export default function MyDevicesPage() {
  const { devices, toggleDevice } = useDevices();
  const storedUser = JSON.parse(localStorage.getItem('smartHouseUser') || 'null');
  const canToggle = (permission) => storedUser?.permissions?.includes(permission);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Home</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>Thiết bị của tôi</div>
        </div>
        <div style={{ padding: '8px 12px', borderRadius: 999, background: '#f0fdfa', color: '#0f766e', fontWeight: 600, fontSize: 14 }}>
          {storedUser?.fullName || 'User'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
      {devices.map((device) => {
        const hasPermission = canToggle(device.permission);
        const Icon = iconMap[device.type] ?? Power;
        const ConnectionIcon = device.online ? Wifi : WifiOff;

        return (
          <div
            key={device.id}
            style={{
              background: 'linear-gradient(180deg,#ffffff,#f0fdfa)',
              border: '1px solid #d6f4ed',
              borderRadius: 18,
              padding: 18,
              boxShadow: '0 12px 36px rgba(15,118,110,0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: device.status === 'ON' ? '#dbeafe' : '#f1f5f9', display: 'grid', placeItems: 'center', color: device.status === 'ON' ? '#2563eb' : '#475569' }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{device.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{device.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 999, background: device.online ? '#ecfdf3' : '#f1f5f9' }}>
                <ConnectionIcon size={14} color={device.online ? '#16a34a' : '#64748b'} />
                <span style={{ fontSize: 12, fontWeight: 600, color: device.online ? '#16a34a' : '#64748b' }}>
                  {device.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: device.status === 'ON' ? '#22c55e' : '#94a3b8' }} />
                <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>
                  {device.status === 'ON' ? 'Đang bật' : 'Tắt'}
                </span>
              </div>

              {hasPermission ? (
                <button
                  onClick={() => toggleDevice({ id: device.id, status: device.status === 'ON' ? 'OFF' : 'ON' })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: 'none',
                    background: device.status === 'ON' ? '#14b8a6' : '#e2e8f0',
                    color: device.status === 'ON' ? '#fff' : '#334155',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  <Power size={16} />
                  {device.status === 'ON' ? 'Bật' : 'Tắt'}
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, border: '1px dashed #99f6e4', color: '#0f766e', background: '#f0fdfa' }}>
                  <Lock size={16} />
                  <span>Không có quyền</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
