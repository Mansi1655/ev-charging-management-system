import React, { useEffect, useState } from 'react';
import { getConnectors, addConnector } from '../api';

export default function Connectors() {
  const [connectors, setConnectors] = useState([]);
  const [formData, setFormData] = useState({ connector_id: '', connector_type: '', max_power_kw: '', status_id: '', station_id: '' });

  useEffect(() => { loadConnectors(); }, []);
  const loadConnectors = () => getConnectors().then(r => setConnectors(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addConnector(formData).then(() => {
      loadConnectors();
      setFormData({ connector_id: '', connector_type: '', max_power_kw: '', status_id: '', station_id: '' });
    }).catch(alert);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Connectors Registry</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Add New Connector</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="ID" type="number" required
                 value={formData.connector_id} onChange={e => setFormData({...formData, connector_id: e.target.value})} />
          <input className="premium-input" placeholder="Type (e.g. CCS2)" required
                 value={formData.connector_type} onChange={e => setFormData({...formData, connector_type: e.target.value})} />
          <input className="premium-input" placeholder="Max Power (kW)" type="number" step="0.1" required
                 value={formData.max_power_kw} onChange={e => setFormData({...formData, max_power_kw: e.target.value})} />
          <select className="premium-input" required value={formData.status_id} onChange={e => setFormData({...formData, status_id: e.target.value})}>
            <option value="">Select Status</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="IN_USE">IN USE</option>
            <option value="OFFLINE">OFFLINE</option>
          </select>
          <input className="premium-input" placeholder="Station ID" type="number" required
                 value={formData.station_id} onChange={e => setFormData({...formData, station_id: e.target.value})} />
          <button className="premium-btn" type="submit">Add Connector</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>ID</th><th>Type</th><th>Max Power</th><th>Status</th><th>Station</th></tr></thead>
          <tbody>
            {connectors.map(c => (
              <tr key={c.connector_id}>
                <td>#{c.connector_id}</td>
                <td style={{ fontWeight: 600 }}>{c.connector_type}</td>
                <td>{c.max_power_kw} kW</td>
                <td>
                  <span className={`badge ${c.status_id === 'AVAILABLE' ? 'badge-success' : c.status_id === 'IN_USE' ? 'badge-warning' : 'badge-danger'}`}>
                    {c.status_id}
                  </span>
                </td>
                <td>{c.operator_name} (ID: {c.station_id})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
