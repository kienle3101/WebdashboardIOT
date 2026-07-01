export default function BarChart({ data = [] }) {
  const max = Math.max(...data.map((item) => item.count), 1);

  return (
    <div style={{ background: '#f8fbff', border: '1px solid #eef0f3', borderRadius: 14, padding: 16, minHeight: 260 }}>
      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 12, height: 220 }}>
        {data.map((item) => (
          <div key={item.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'end', height: 180 }}>
              <div
                style={{
                  width: '70%',
                  height: `${(item.count / max) * 100}%`,
                  minHeight: 24,
                  borderRadius: 12,
                  background: 'linear-gradient(180deg,#2563eb,#60a5fa)',
                  boxShadow: '0 10px 24px rgba(37,99,235,0.18)',
                }}
              />
            </div>
            <span style={{ fontSize: 12, color: '#64748b' }}>{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
