import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('smartHouseUser') || 'null');
  const visibleUser = user ?? storedUser;

  if (!localStorage.getItem('smartHouseToken')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8fb', display: 'flex' }}>
      <Sidebar role={visibleUser?.role || 'USER'} collapsed={collapsed} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar user={visibleUser} collapsed={collapsed} onToggleCollapse={() => setCollapsed((prev) => !prev)} onLogout={() => logout()} />
        <main style={{ flex: 1, padding: 24 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
