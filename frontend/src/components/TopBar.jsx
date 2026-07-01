import { Bell, Search, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function TopBar({ user, onLogout, collapsed, onToggleCollapse }) {
  return (
    <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid #eef0f3', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onToggleCollapse}
          style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid #eef0f3', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f6f8fb', padding: '10px 14px', borderRadius: 12, minWidth: 320 }}>
          <Search size={18} color="#64748b" />
          <input placeholder="Tìm kiếm" style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: 14 }} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid #eef0f3', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 14, background: '#f8fbff', border: '1px solid #eef0f3' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#2563eb,#60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
            {user?.fullName?.[0] ?? 'U'}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{user?.fullName ?? 'User'}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{user?.role ?? 'USER'}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid #fee2e2', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
