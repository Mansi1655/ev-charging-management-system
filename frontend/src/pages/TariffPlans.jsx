import React, { useEffect, useState } from 'react';
import { getTariffPlans, addTariffPlan } from '../api';

export default function TariffPlans() {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({ plan_id: '', station_id: '', price_per_kwh: '', tod_windows: '' });

  useEffect(() => { loadPlans(); }, []);
  const loadPlans = () => getTariffPlans().then(r => setPlans(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTariffPlan(formData).then(() => {
      loadPlans();
      setFormData({ plan_id: '', station_id: '', price_per_kwh: '', tod_windows: '' });
    }).catch(alert);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Tariff Plans</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Create Tariff Plan</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="Plan ID" type="number" required
                 value={formData.plan_id} onChange={e => setFormData({...formData, plan_id: e.target.value})} />
          <input className="premium-input" placeholder="Station ID" type="number" required
                 value={formData.station_id} onChange={e => setFormData({...formData, station_id: e.target.value})} />
          <input className="premium-input" placeholder="Price/kWh" type="number" step="0.01" required
                 value={formData.price_per_kwh} onChange={e => setFormData({...formData, price_per_kwh: e.target.value})} />
          <input className="premium-input" placeholder="TOD Windows (e.g. 09-17: Peak)" 
                 value={formData.tod_windows} onChange={e => setFormData({...formData, tod_windows: e.target.value})} />
          <button className="premium-btn" type="submit">Add Plan</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>Plan ID</th><th>Station</th><th>Price / kWh</th><th>TOD Window</th></tr></thead>
          <tbody>
            {plans.map(p => (
              <tr key={p.plan_id}>
                <td>#{p.plan_id}</td>
                <td>{p.operator_name} (ID: {p.station_id})</td>
                <td style={{ fontWeight: 600, color: 'var(--accent-success)' }}>Rs {p.price_per_kwh}</td>
                <td>{p.tod_windows || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
