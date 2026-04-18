import React, { useEffect, useState } from 'react';
import { getDiscoms, addDiscom } from '../api';

export default function Discoms() {
  const [discoms, setDiscoms] = useState([]);
  const [formData, setFormData] = useState({ discom_id: '', discom_name: '' });

  useEffect(() => { loadDiscoms(); }, []);
  const loadDiscoms = () => getDiscoms().then(r => setDiscoms(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDiscom(formData).then(() => {
      loadDiscoms();
      setFormData({ discom_id: '', discom_name: '' });
    }).catch(alert);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Discoms (Distribution Companies)</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Register New Discom</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="Discom ID" type="number" required
                 value={formData.discom_id} onChange={e => setFormData({...formData, discom_id: e.target.value})} />
          <input className="premium-input" placeholder="Discom Name" required
                 value={formData.discom_name} onChange={e => setFormData({...formData, discom_name: e.target.value})} />
          <button className="premium-btn" type="submit">Add Discom</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>ID</th><th>Discom Name</th></tr></thead>
          <tbody>
            {discoms.map(d => (
              <tr key={d.discom_id}>
                <td>#{d.discom_id}</td>
                <td style={{ fontWeight: 600 }}>{d.discom_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
