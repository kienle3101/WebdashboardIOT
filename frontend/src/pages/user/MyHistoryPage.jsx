import { useActivityLogs } from '../../hooks/useActivityLogs';

export default function MyHistoryPage() {
  const { data: logs = [] } = useActivityLogs({ scope: 'me' });

  return (
    <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 14, padding: 18 }}>
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Lịch sử của tôi</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fbff' }}>
              <th style={{ textAlign: 'left', padding: 12 }}>Thời gian</th>
              <th style={{ textAlign: 'left', padding: 12 }}>Thiết bị</th>
              <th style={{ textAlign: 'left', padding: 12 }}>Hành động</th>
              <th style={{ textAlign: 'left', padding: 12 }}>Nguồn</th>
              <th style={{ textAlign: 'left', padding: 12 }}>Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: 12 }}>{log.time}</td>
                <td style={{ padding: 12 }}>{log.device}</td>
                <td style={{ padding: 12 }}>{log.action}</td>
                <td style={{ padding: 12 }}>{log.source}</td>
                <td style={{ padding: 12 }}>{log.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
