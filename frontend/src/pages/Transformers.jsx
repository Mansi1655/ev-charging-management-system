import React, { useEffect, useState } from 'react';
import { getTransformers, addTransformer } from '../api';

export default function Transformers() {
  const [transformers, setTransformers] = useState([]);
  const [formData, setFormData] = useState({ transformer_id: '', capacity_kva: '', feeder_name: '' });

  useEffect(() => { loadTransformers(); }, []);
  const loadTransformers = () => getTransformers().then(r => setTransformers(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransformer(formData).then(() => {
      loadTransformers();
      setFormData({ transformer_id: '', capacity_kva: '', feeder_name: '' });
    }).catch(alert);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Transformers Management</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Add Transformer</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="Transformer ID" type="number" required
                 value={formData.transformer_id} onChange={e => setFormData({...formData, transformer_id: e.target.value})} />
          <input className="premium-input" placeholder="Capacity (kVA)" type="number" step="0.1" required
                 value={formData.capacity_kva} onChange={e => setFormData({...formData, capacity_kva: e.target.value})} />
          <input className="premium-input" placeholder="Feeder Name" required
                 value={formData.feeder_name} onChange={e => setFormData({...formData, feeder_name: e.target.value})} />
          <button className="premium-btn" type="submit">Add Transformer</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>ID</th><th>Capacity</th><th>Feeder Name</th></tr></thead>
          <tbody>
            {transformers.map(t => (
              <tr key={t.transformer_id}>
                <td>#{t.transformer_id}</td>
                <td>{t.capacity_kva} kVA</td>
                <td style={{ fontWeight: 600 }}>{t.feeder_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
