export default function Badge({ children, tone = '#eff6ff', color = '#2563eb' }) {
  return <span style={{ padding: '4px 10px', borderRadius: 999, background: tone, color, fontSize: 12, fontWeight: 600 }}>{children}</span>;
}
