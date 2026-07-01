import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, LampDesk, ShieldCheck, Wind } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const deviceChips = [
  { label: 'Đèn ON', icon: LampDesk, tone: '#dbeafe' },
  { label: 'Cửa Đóng', icon: ShieldCheck, tone: '#e2e8f0' },
  { label: 'Quạt ON', icon: Wind, tone: '#dcfce7' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await login({ username, password });
      const user = result?.user ?? result?.data?.user;
      if (remember) localStorage.setItem('smartHouseRemember', username);
      navigate(user?.role === 'ADMIN' ? '/admin/overview' : '/user/devices', { replace: true });
    } catch (err) {
      setError('Thông tin đăng nhập không hợp lệ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#eff6ff,#f8fbff)', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 1100, background: '#fff', borderRadius: 28, boxShadow: '0 20px 60px rgba(37,99,235,0.10)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr' }}>
        <div style={{ background: 'linear-gradient(180deg,#2563eb,#3b82f6)', padding: 44, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.18)', display: 'grid', placeItems: 'center' }}>
              <Home size={26} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>SmartHouse Mini</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>Hệ thống quản lý nhà thông minh</div>
            </div>
          </div>

          <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
            Kiểm soát mọi thiết bị tại nhà bạn.
          </div>
          <div style={{ fontSize: 16, opacity: 0.72, marginBottom: 32 }}>
            Theo dõi trạng thái, quản lý quyền truy cập và kiểm tra lịch sử sử dụng từ một nơi.
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {deviceChips.map(({ label, icon: Icon, tone }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: tone, display: 'grid', placeItems: 'center', color: '#2563eb' }}>
                  <Icon size={18} />
                </div>
                <span style={{ fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 42, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Đăng nhập</div>
          <div style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Chào mừng quay lại SmartHouse Mini</div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
            <label>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Tên đăng nhập</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '1px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </label>

            <label>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Mật khẩu</span>
              <div style={{ display: 'flex', alignItems: 'center', borderRadius: 14, border: '1px solid #e2e8f0', padding: '0 12px' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} style={{ flex: 1, padding: '14px 4px', border: 'none', outline: 'none', fontSize: 15 }} />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#334155' }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            {error && <div style={{ padding: '10px 12px', background: '#fef2f2', color: '#b91c1c', borderRadius: 12, fontSize: 14 }}>{error}</div>}

            <button type="submit" disabled={loading} style={{ height: 52, border: 'none', borderRadius: 14, background: '#2563eb', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
