import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminDevicesPage from './pages/admin/AdminDevicesPage';
import AdminPermsPage from './pages/admin/AdminPermsPage';
import AdminHistoryPage from './pages/admin/AdminHistoryPage';
import AdminAccountPage from './pages/admin/AdminAccountPage';
import MyDevicesPage from './pages/user/MyDevicesPage';
import MyHistoryPage from './pages/user/MyHistoryPage';
import MyAccountPage from './pages/user/MyAccountPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin/devices" element={<AdminDevicesPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/permissions" element={<AdminPermsPage />} />
          <Route path="/admin/history" element={<AdminHistoryPage />} />
          <Route path="/admin/account" element={<AdminAccountPage />} />
          <Route path="/user/overview" element={<AdminOverview />} />
          <Route path="/user/devices" element={<MyDevicesPage />} />
          <Route path="/user/history" element={<MyHistoryPage />} />
          <Route path="/user/account" element={<MyAccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
