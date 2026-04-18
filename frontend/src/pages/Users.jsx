import React, { useEffect, useState } from 'react';
import { getUsers, addUser } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ user_id: '', kyc_status: '' });

  useEffect(() => { loadUsers(); }, []);
  const loadUsers = () => getUsers().then(r => setUsers(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData).then(() => {
      loadUsers();
      setFormData({ user_id: '', kyc_status: '' });
    }).catch(alert);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">User Management</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Register New User</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="User ID" type="number" required
                 value={formData.user_id} onChange={e => setFormData({...formData, user_id: e.target.value})} />
          <select className="premium-input" required value={formData.kyc_status} onChange={e => setFormData({...formData, kyc_status: e.target.value})}>
            <option value="">Select KYC Status</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="PENDING">PENDING</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <button className="premium-btn" type="submit">Add User</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>User ID</th><th>KYC Status</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.user_id}>
                <td>#{u.user_id}</td>
                <td>
                  <span className={`badge ${u.kyc_status === 'VERIFIED' ? 'badge-success' : u.kyc_status === 'PENDING' ? 'badge-warning' : 'badge-danger'}`}>
                    {u.kyc_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
