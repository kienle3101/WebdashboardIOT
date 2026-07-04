import { useState } from 'react';
import { useActivityLogs } from '../../hooks/useActivityLogs';

export default function MyHistoryPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data: response = { data: [], total: 0, pageNo: 1, pageSize: 5 }, isLoading } = useActivityLogs({ pageNo, pageSize, scope: 'me' });
  const logs = response.data ?? [];
  const total = response.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 14, padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>Lịch sử của tôi</div>
          <div style={{ color: '#64748b', marginTop: 6 }}>Hiển thị trang {pageNo} / {totalPages}</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setPageNo((prev) => Math.max(1, prev - 1))}
            disabled={pageNo <= 1 || isLoading}
            style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #cbd5e1', background: '#fff', cursor: pageNo <= 1 || isLoading ? 'not-allowed' : 'pointer' }}
          >
            Trước
          </button>
          <button
            type="button"
            onClick={() => setPageNo((prev) => Math.min(totalPages, prev + 1))}
            disabled={pageNo >= totalPages || isLoading}
            style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #cbd5e1', background: '#fff', cursor: pageNo >= totalPages || isLoading ? 'not-allowed' : 'pointer' }}
          >
            Sau
          </button>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPageNo(1);
            }}
            style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>{size} / trang</option>
            ))}
          </select>
        </div>
      </div>
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
