import { useMemo, useState } from 'react';
import { Filter, Plus, Search, Trash2, UserRound } from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';

const avatarColors = ['#2563eb', '#16a34a', '#f59e0b', '#a855f7', '#ef4444'];

const roleStyle = {
  ADMIN: { bg: '#eff6ff', color: '#2563eb' },
  USER: { bg: '#ecfdf5', color: '#16a34a' },
};

export default function AdminUsersPage() {
  const { users, deleteUser } = useUsers();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q)
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = (user) => {
    if (window.confirm(`Xóa người dùng "${user.username}"?`)) {
      deleteUser({ id: user.id });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Quản lý người dùng</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
            Quản lý tài khoản người dùng trong hệ thống
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 10,
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Plus size={16} />
            Thêm user
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              background: '#fff',
              color: '#334155',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <Filter size={16} />
            Lọc
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: 16 }}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Tìm kiếm theo username, họ tên..."
          style={{
            width: '100%',
            padding: '12px 44px 12px 16px',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            fontSize: 13,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <Search size={16} color="#94a3b8" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }} />
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid #eef0f3',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {['Username', 'Họ tên', 'Role', 'Permissions', 'Xóa user'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    padding: '14px 20px',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'none',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((user, idx) => {
              const avatarColor = avatarColors[idx % avatarColors.length];
              const role = roleStyle[user.role] ?? roleStyle.USER;

              return (
                <tr key={user.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: avatarColor,
                          display: 'grid',
                          placeItems: 'center',
                          color: '#fff',
                        }}
                      >
                        <UserRound size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>{user.username}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#334155' }}>{user.fullName}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: role.bg,
                        color: role.color,
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(user.permissions ?? []).map((perm) => (
                        <span
                          key={perm}
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: 999,
                            background: '#eff6ff',
                            color: '#2563eb',
                          }}
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      onClick={() => handleDelete(user)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        border: 'none',
                        background: '#fef2f2',
                        color: '#ef4444',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            fontSize: 12,
            color: '#64748b',
          }}
        >
          <span>
            Hiển thị {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} đến{' '}
            {Math.min(page * pageSize, filtered.length)} của {filtered.length} người dùng
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#fff',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                color: '#64748b',
              }}
            >
              ‹
            </button>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: '1px solid #2563eb',
                color: '#2563eb',
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {page}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#fff',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                color: '#64748b',
              }}
            >
              ›
            </button>
          </div>

          <select
            value={pageSize}
            disabled
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 12,
              color: '#334155',
              background: '#fff',
            }}
          >
            <option>10 / trang</option>
          </select>
        </div>
      </div>
    </div>
  );
}