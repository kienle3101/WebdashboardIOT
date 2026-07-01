import { Home } from 'lucide-react';

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 42, height: 42, borderRadius: 14, background: 'linear-gradient(135deg,#2563eb,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 30px rgba(37,99,235,0.25)' }}>
        <Home size={22} />
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>SmartHouse</div>
        <div style={{ fontSize: 12, color: '#64748b' }}>Mini</div>
      </div>
    </div>
  );
}
