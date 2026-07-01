import { useMemo, useState } from 'react';
import { DoorOpen, Fan, Lightbulb, Lock, ShieldCheck, UserRound } from 'lucide-react';
import { useDevices } from '../../hooks/useDevices';
import { useUsers } from '../../hooks/useUsers';

const permissionConfig = {
  DEVICE_LIGHT: { label: 'Đèn phòng khách', icon: Lightbulb, tint: '#2563eb', soft: '#eff6ff' },
  DEVICE_FAN: { label: 'Quạt trần', icon: Fan, tint: '#f59e0b', soft: '#fffbeb' },
  DEVICE_DOOR: { label: 'Cửa chính', icon: DoorOpen, tint: '#10b981', soft: '#ecfdf5' },
  DEVICE_LOCKER: { label: 'Khóa cửa', icon: Lock, tint: '#ef4444', soft: '#fef2f2' },
};

export default function AdminPermsPage() {
  const { users, updatePermissions } = useUsers();
  const { devices } = useDevices();
  const [selected, setSelected] = useState({});

  const permissionOptions = useMemo(() => Object.keys(permissionConfig), []);

  const handleToggle = (userId, permission) => {
    const current = selected[userId] ?? users.find((u) => u.id === userId)?.permissions ?? [];
    const next = current.includes(permission) ? current.filter((item) => item !== permission) : [...current, permission];
    setSelected((prev) => ({ ...prev, [userId]: next }));
    updatePermissions({ id: userId, permissions: next });
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 18, padding: 18, boxShadow: '0 10px 30px rgba(15,23,42,0.04)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Management</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>Phân quyền thiết bị</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: '#eff6ff', color: '#1d4ed8', fontWeight: 600 }}>
          <ShieldCheck size={14} />
          <span>{devices.length} thiết bị</span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {users.map((user) => {
          const value = selected[user.id] ?? user.permissions ?? [];
          const grantedCount = value.length;

          return (
            <div key={user.id} style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, background: 'linear-gradient(180deg,#f8fbff,#ffffff)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: '#e2e8f0', display: 'grid', placeItems: 'center', color: '#334155' }}>
                    <UserRound size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{user.fullName}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{user.username} • {user.role}</div>
                  </div>
                </div>

                <div style={{ padding: '6px 10px', borderRadius: 999, background: '#f1f5f9', color: '#334155', fontSize: 12, fontWeight: 700 }}>
                  {grantedCount} quyền
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                {permissionOptions.map((permission) => {
                  const checked = value.includes(permission);
                  const config = permissionConfig[permission];
                  const Icon = config.icon;

                  return (
                    <label
                      key={permission}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px',
                        borderRadius: 14,
                        border: checked ? `1px solid ${config.tint}` : '1px solid #e2e8f0',
                        background: checked ? config.soft : '#fff',
                        cursor: 'pointer',
                        boxShadow: checked ? `0 0 0 3px ${config.soft}` : 'none',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggle(user.id, permission)}
                        style={{ accentColor: config.tint, width: 18, height: 18 }}
                      />
                      <div style={{ width: 38, height: 38, borderRadius: 12, background: checked ? config.tint : '#f1f5f9', display: 'grid', placeItems: 'center', color: checked ? '#fff' : '#475569' }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{config.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
