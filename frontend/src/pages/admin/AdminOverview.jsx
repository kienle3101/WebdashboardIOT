import { Activity, Lock, Users, Zap, MonitorSmartphone, Lightbulb, Fan, DoorClosed, MoreVertical, TrendingUp } from 'lucide-react';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';
import { useActivityLogs } from '../../hooks/useActivityLogs';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { useDevices } from '../../hooks/useDevices';

const deviceTypeConfig = {
  LIGHT: { icon: Lightbulb, bg: '#fef3c7', tint: '#f59e0b' },
  FAN: { icon: Fan, bg: '#dcfce7', tint: '#16a34a' },
  DOOR: { icon: DoorClosed, bg: '#ffedd5', tint: '#ea580c' },
  LOCKER: { icon: Lock, bg: '#ffedd5', tint: '#ea580c' },
};

const actionBadge = {
  Bật: { bg: '#dcfce7', color: '#16a34a' },
  Mở: { bg: '#dcfce7', color: '#16a34a' },
  Tắt: { bg: '#fee2e2', color: '#ef4444' },
  Đóng: { bg: '#dbeafe', color: '#2563eb' },
};

export default function AdminOverview() {
  const { stats, weeklyActivity } = useDashboardStats();
  const { devices } = useDevices();
  const { data: recentLogs = [] } = useActivityLogs({ limit: 5 });

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
        <StatCard title="Tổng user" value={stats.totalUsers ?? 0} icon={Users} color="#dbeafe" iconColor="#2563eb" />
        <StatCard title="Thiết bị" value={stats.totalDevices ?? 0} icon={MonitorSmartphone} color="#dcfce7" iconColor="#16a34a" />
        <StatCard title="Thiết bị đang bật/mở" value={stats.activeDevices ?? 0} icon={Zap} color="#fef3c7" iconColor="#f59e0b" />
        <StatCard title="Số lượt thao tác hôm nay" value={stats.todayActions ?? 0} icon={TrendingUp} color="#ede9fe" iconColor="#9333ea" />
      </div>

      <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 16, padding: 18, boxShadow: '0 10px 30px rgba(15,23,42,0.04)' }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Trạng thái thiết bị</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
          {devices.slice(0, 3).map((device) => {
            const config = deviceTypeConfig[device.type] ?? deviceTypeConfig.LIGHT;
            const Icon = config.icon;
            const isDoor = device.type === 'DOOR' || device.type === 'LOCKER';
            const isOn = device.status === 'ON';

            return (
              <div
                key={device.id}
                style={{
                  position: 'relative',
                  background: '#f8fbff',
                  border: '1px solid #eef0f3',
                  borderRadius: 14,
                  padding: '18px 14px',
                  textAlign: 'center',
                }}
              >
                <button style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1' }}>
                  <MoreVertical size={16} />
                </button>

                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: config.bg,
                    color: config.tint,
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 10px',
                  }}
                >
                  <Icon size={20} />
                </div>

                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{device.name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', letterSpacing: '0.05em', marginTop: 2, marginBottom: 8 }}>
                  {device.type}
                </div>

                {isDoor ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 999,
                      background: '#dbeafe',
                      color: '#2563eb',
                    }}
                  >
                    <Lock size={11} />
                    {isOn ? 'OPEN' : 'CLOSED'}
                  </span>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: isOn ? '#16a34a' : '#94a3b8' }} />
                    {isOn ? 'ON' : 'OFF'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 16, padding: 18, boxShadow: '0 10px 30px rgba(15,23,42,0.04)' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Nhật ký sử dụng gần đây</div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['Thời gian', 'User', 'Thiết bị', 'Hành động', 'Nguồn', 'Kết quả'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => {
                const badge = actionBadge[log.action] ?? { bg: '#f1f5f9', color: '#64748b' };
                return (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '10px', fontSize: 12, color: '#64748b' }}>{log.time}</td>
                    <td style={{ padding: '10px', fontSize: 12, color: '#334155' }}>{log.user}</td>
                    <td style={{ padding: '10px', fontSize: 12, color: '#334155' }}>{log.device}</td>
                    <td style={{ padding: '10px' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 10px',
                          borderRadius: 999,
                          background: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '10px', fontSize: 12, color: '#64748b' }}>{log.source}</td>
                    <td style={{ padding: '10px', fontSize: 12, color: '#16a34a', fontWeight: 600 }}>✓ Thành công</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <a href="/admin/logs" style={{ fontSize: 13, color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
              Xem tất cả
            </a>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 16, padding: 18, boxShadow: '0 10px 30px rgba(15,23,42,0.04)' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Hoạt động trong 7 ngày qua</div>
          <BarChart data={weeklyActivity} color="#2563eb" />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: '#2563eb' }} />
            <span style={{ fontSize: 12, color: '#64748b' }}>Số lượt thao tác</span>
          </div>
        </div>
      </div>
    </div>
  );
}