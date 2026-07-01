export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 16, padding: 18, boxShadow: '0 10px 30px rgba(15,23,42,0.04)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#64748b', fontSize: 14 }}>{title}</span>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: color, display: 'grid', placeItems: 'center', color: '#2563eb' }}>
          {Icon ? <Icon size={20} /> : null}
        </div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, marginTop: 10, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}
