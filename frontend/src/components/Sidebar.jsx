import { NavLink } from 'react-router-dom';
import { Activity, Boxes, CircleUserRound, History, LayoutDashboard, Shield, Users, Cable } from 'lucide-react';
import Logo from './Logo';

const adminItems = [
  { label: 'Tổng quan', path: '/admin/overview', icon: LayoutDashboard },
  { label: 'Thiết bị', path: '/admin/devices', icon: Boxes },
  { label: 'Người dùng', path: '/admin/users', icon: Users },
  { label: 'Phân quyền thiết bị', path: '/admin/permissions', icon: Shield },
  { label: 'Lịch sử sử dụng', path: '/admin/history', icon: History },
  { label: 'Kết nối COM', path: '/admin/serial', icon: Cable },
  { label: 'Tài khoản', path: '/admin/account', icon: CircleUserRound },
];

const userItems = [
  { label: 'Tổng quan', path: '/user/overview', icon: LayoutDashboard },
  { label: 'Thiết bị của tôi', path: '/user/devices', icon: Boxes },
  { label: 'Lịch sử của tôi', path: '/user/history', icon: Activity },
  { label: 'Tài khoản', path: '/user/account', icon: CircleUserRound },
];

export default function Sidebar({ role, collapsed }) {
  const items = role === 'ADMIN' ? adminItems : userItems;

  return (
    <aside style={{ width: collapsed ? 86 : 256, background: '#fff', borderRight: '1px solid #eef0f3', padding: '24px 16px', transition: 'width 0.2s ease' }}>
      <div style={{ padding: '0 8px 20px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <span style={{ transform: collapsed ? 'scale(0.8)' : 'scale(1)', transformOrigin: 'left center' }}>
          <Logo />
        </span>
      </div>
      <nav style={{ display: 'grid', gap: 8 }}>
        {items.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px',
              borderRadius: 12,
              textDecoration: 'none',
              color: isActive ? '#2563eb' : '#334155',
              background: isActive ? '#eff6ff' : 'transparent',
              fontWeight: isActive ? 600 : 500,
            })}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
