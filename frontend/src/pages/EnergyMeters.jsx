import React, { useEffect, useState } from 'react';
import { getEnergyMeters, addEnergyMeter } from '../api';

export default function EnergyMeters() {
  const [meters, setMeters] = useState([]);
  const [formData, setFormData] = useState({ meter_id: '', station_id: '' });

  useEffect(() => { loadMeters(); }, []);
  const loadMeters = () => getEnergyMeters().then(r => setMeters(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnergyMeter(formData).then(() => {
      loadMeters();
      setFormData({ meter_id: '', station_id: '' });
    }).catch(alert);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Energy Meters</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Register Meter</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="Meter ID" type="number" required
                 value={formData.meter_id} onChange={e => setFormData({...formData, meter_id: e.target.value})} />
          <input className="premium-input" placeholder="Station ID" type="number" required
                 value={formData.station_id} onChange={e => setFormData({...formData, station_id: e.target.value})} />
          <button className="premium-btn" type="submit">Add Meter</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>ID</th><th>Station Installation</th></tr></thead>
          <tbody>
            {meters.map(m => (
              <tr key={m.meter_id}>
                <td>#{m.meter_id}</td>
                <td style={{ fontWeight: 600 }}>{m.operator_name} (ID: {m.station_id})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
