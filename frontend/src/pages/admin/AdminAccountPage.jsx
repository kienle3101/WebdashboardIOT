import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminAccountPage() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 14, padding: 24, maxWidth: 520 }}>
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Tài khoản</div>
      <div style={{ background: '#f8fbff', border: '1px solid #eef0f3', borderRadius: 14, padding: 16, marginBottom: 18 }}>
        <div style={{ fontSize: 14, color: '#64748b' }}>Tên đăng nhập</div>
        <div style={{ fontWeight: 600 }}>{user?.username}</div>
        <div style={{ fontSize: 14, color: '#64748b', marginTop: 8 }}>Họ tên</div>
        <div style={{ fontWeight: 600 }}>{user?.fullName}</div>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Mật khẩu mới</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #eef0f3', boxSizing: 'border-box' }} />
        </label>
        <label>
          <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Xác nhận mật khẩu</span>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #eef0f3', boxSizing: 'border-box' }} />
        </label>
        <button style={{ padding: '12px 14px', borderRadius: 12, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600 }}>Đổi mật khẩu</button>
      </div>
    </div>
  );
}
