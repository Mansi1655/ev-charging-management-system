import React, { useEffect, useState } from 'react';
import { getVehicles, addVehicle } from '../api';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ vehicle_id: '', make: '', battery_capacity: '', user_id: '' });

  useEffect(() => { loadVehicles(); }, []);
  const loadVehicles = () => getVehicles().then(r => setVehicles(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle(formData).then(() => {
      loadVehicles();
      setFormData({ vehicle_id: '', make: '', battery_capacity: '', user_id: '' });
    }).catch(alert);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Vehicles Registry</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Register New Vehicle</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="Vehicle ID" type="number" required
                 value={formData.vehicle_id} onChange={e => setFormData({...formData, vehicle_id: e.target.value})} />
          <input className="premium-input" placeholder="Make" required
                 value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} />
          <input className="premium-input" placeholder="Battery Capacity (kWh)" type="number" step="0.1" required
                 value={formData.battery_capacity} onChange={e => setFormData({...formData, battery_capacity: e.target.value})} />
          <input className="premium-input" placeholder="User ID (Owner)" type="number" required
                 value={formData.user_id} onChange={e => setFormData({...formData, user_id: e.target.value})} />
          <button className="premium-btn" type="submit">Add Vehicle</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>ID</th><th>Make</th><th>Capacity</th><th>Owner ID</th><th>Owner KYC</th></tr></thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v.vehicle_id}>
                <td>#{v.vehicle_id}</td>
                <td style={{ fontWeight: 600 }}>{v.make}</td>
                <td>{v.battery_capacity} kWh</td>
                <td>#{v.user_id}</td>
                <td><span className="badge badge-info">{v.kyc_status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
