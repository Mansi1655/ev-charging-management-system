import React, { useEffect, useState } from 'react';
import { getStations, addStation } from '../api';

export default function Stations() {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({ station_id:'', operator_name:'', latitude:'', longitude:'', discom_id:'', transformer_id:'' });

  useEffect(() => { loadStations(); }, []);
  const loadStations = () => getStations().then(r => setStations(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addStation(formData).then(() => {
      loadStations();
      setFormData({ station_id:'', operator_name:'', latitude:'', longitude:'', discom_id:'', transformer_id:'' });
    }).catch(console.error);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Charging Stations</h1>

      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Add Station</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <input className="premium-input" placeholder="Station ID" type="number" required value={formData.station_id} onChange={e => setFormData({...formData, station_id: e.target.value})} />
          <input className="premium-input" placeholder="Operator Name" required value={formData.operator_name} onChange={e => setFormData({...formData, operator_name: e.target.value})} />
          <input className="premium-input" placeholder="Lat" type="number" step="0.000001" required value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} />
          <input className="premium-input" placeholder="Lng" type="number" step="0.000001" required value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} />
          <input className="premium-input" placeholder="Discom ID" type="number" required value={formData.discom_id} onChange={e => setFormData({...formData, discom_id: e.target.value})} />
          <input className="premium-input" placeholder="Transformer ID" type="number" required value={formData.transformer_id} onChange={e => setFormData({...formData, transformer_id: e.target.value})} />
          <button className="premium-btn" type="submit" style={{ gridColumn: '1 / -1' }}>Deploy Station</button>
        </form>
      </div>

      <div className="grid-cards">
        {stations.map(s => (
          <div key={s.station_id} className="glass-card">
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '12px' }}>
              {s.operator_name}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '6px' }}>📍 {s.latitude}, {s.longitude}</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '6px' }}>🔌 Discom: {s.discom_name}</p>
            <p style={{ fontSize: '0.9rem' }}>⚡ Transformer: #{s.transformer_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
