import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, LampDesk, ShieldCheck, Wind } from 'lucide-react';
import { register } from '../api/authApi';

const deviceChips = [
  { label: 'Đèn ON', icon: LampDesk, tone: '#dbeafe' },
  { label: 'Cửa Đóng', icon: ShieldCheck, tone: '#e2e8f0' },
  { label: 'Quạt ON', icon: Wind, tone: '#dcfce7' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.fullName.trim().length < 2) {
      setError('Họ tên phải có ít nhất 2 ký tự.');
      return;
    }

    if (form.username.trim().length < 6) {
      setError('Tên đăng nhập phải có ít nhất 6 ký tự.');
      return;
    }

    if (form.password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        password: form.password,
      });
      navigate('/login', { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setError(message);
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
            Tạo tài khoản để bắt đầu điều khiển nhà thông minh.
          </div>
          <div style={{ fontSize: 16, opacity: 0.72, marginBottom: 32 }}>
            Đăng ký nhanh và truy cập dashboard để quản lý thiết bị và lịch sử hoạt động.
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
          <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Đăng ký</div>
          <div style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Tạo tài khoản mới cho SmartHouse Mini</div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
            <label>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Họ và tên</span>
              <input name="fullName" value={form.fullName} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '1px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </label>

            <label>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Tên đăng nhập</span>
              <input name="username" value={form.username} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '1px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </label>

            <label>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Mật khẩu</span>
              <div style={{ display: 'flex', alignItems: 'center', borderRadius: 14, border: '1px solid #e2e8f0', padding: '0 12px' }}>
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} style={{ flex: 1, padding: '14px 4px', border: 'none', outline: 'none', fontSize: 15 }} />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Xác nhận mật khẩu</span>
              <div style={{ display: 'flex', alignItems: 'center', borderRadius: 14, border: '1px solid #e2e8f0', padding: '0 12px' }}>
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} style={{ flex: 1, padding: '14px 4px', border: 'none', outline: 'none', fontSize: 15 }} />
                <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {error && <div style={{ padding: '10px 12px', background: '#fef2f2', color: '#b91c1c', borderRadius: 12, fontSize: 14 }}>{error}</div>}

            <button type="submit" disabled={loading} style={{ height: 52, border: 'none', borderRadius: 14, background: '#2563eb', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>

            <div style={{ textAlign: 'center', fontSize: 14, color: '#64748b' }}>
              Đã có tài khoản?{' '}
              <Link to="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
