import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { connectSerial, disconnectSerial, getSerialStatus } from '../api/serialApi';

export default function SerialConnectionPage() {
  const queryClient = useQueryClient();
  const [statusMessage, setStatusMessage] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['serialStatus'],
    queryFn: getSerialStatus,
    refetchInterval: 10000,
    retry: false,
  });

  const connectMutation = useMutation({
    mutationFn: connectSerial,
    onSuccess: (result) => {
      setStatusMessage(result?.message || 'Kết nối COM thành công');
      queryClient.invalidateQueries({ queryKey: ['serialStatus'] });
    },
    onError: (error) => {
      setStatusMessage(error?.response?.data?.message || 'Không thể kết nối COM');
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectSerial,
    onSuccess: (result) => {
      setStatusMessage(result?.message || 'Ngắt kết nối COM thành công');
      queryClient.invalidateQueries({ queryKey: ['serialStatus'] });
    },
    onError: (error) => {
      setStatusMessage(error?.response?.data?.message || 'Không thể ngắt kết nối COM');
    },
  });

  useEffect(() => {
    if (data?.message) {
      setStatusMessage(data.message);
    }
  }, [data]);

  const connected = Boolean(data?.connected);
  const port = data?.port || '—';
  const baudRate = data?.baudRate || '—';

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 16, padding: 24, boxShadow: '0 10px 30px rgba(15,23,42,0.04)' }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Trạng thái kết nối backend COM</div>
        <div style={{ color: '#64748b', marginBottom: 20 }}>
          Trang này dùng chung cho cả admin và user để kiểm tra và điều khiển kết nối serial với backend.
        </div>

        <div style={{ display: 'grid', gap: 16, maxWidth: 560 }}>
          <div style={{ padding: 16, borderRadius: 14, background: connected ? '#ecfdf3' : '#fef2f2', border: `1px solid ${connected ? '#a7f3d0' : '#fecaca'}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: connected ? '#166534' : '#991b1b', marginBottom: 6 }}>
              {connected ? 'Đã kết nối' : 'Chưa kết nối'}
            </div>
            <div style={{ fontSize: 14, color: '#334155' }}>Cổng: <strong>{port}</strong></div>
            <div style={{ fontSize: 14, color: '#334155' }}>Baud rate: <strong>{baudRate}</strong></div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {!connected ? (
              <button
                onClick={() => connectMutation.mutate()}
                disabled={connectMutation.isPending}
                style={{ border: 'none', borderRadius: 10, padding: '10px 16px', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
              >
                {connectMutation.isPending ? 'Đang kết nối...' : 'Connect'}
              </button>
            ) : (
              <button
                onClick={() => disconnectMutation.mutate()}
                disabled={disconnectMutation.isPending}
                style={{ border: 'none', borderRadius: 10, padding: '10px 16px', background: '#dc2626', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
              >
                {disconnectMutation.isPending ? 'Đang ngắt...' : 'Disconnect'}
              </button>
            )}

            <button
              onClick={() => refetch()}
              style={{ border: '1px solid #cbd5e1', borderRadius: 10, padding: '10px 16px', background: '#fff', color: '#334155', cursor: 'pointer', fontWeight: 600 }}
            >
              Refresh
            </button>
          </div>

          {isLoading && <div style={{ color: '#64748b' }}>Đang tải trạng thái...</div>}
          {statusMessage && <div style={{ color: '#0f172a', background: '#f8fafc', padding: 12, borderRadius: 10 }}>{statusMessage}</div>}
        </div>
      </div>
    </div>
  );
}
