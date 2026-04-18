import React, { useEffect, useState } from 'react';
import { getSessions, endSession } from '../api';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [kw, setKw] = useState('');

  useEffect(() => { loadSessions(); }, []);
  const loadSessions = () => getSessions().then(r => setSessions(r.data)).catch(console.error);

  const handleEnd = (id) => {
    if(!kw) return alert('Enter total kWh delivered first!');
    endSession(id, parseFloat(kw)).then(() => {
      loadSessions();
      setKw('');
    }).catch(console.error);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Live Charging Sessions</h1>

      <div className="grid-cards" style={{ marginBottom: '32px' }}>
        {sessions.map(s => {
          const isActive = !s.end_time;
          return (
            <div key={s.session_id} className="glass-card" style={{ borderLeft: isActive ? '4px solid var(--accent-warning)' : '4px solid var(--accent-success)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Session #{s.session_id}</h3>
                {isActive ? <span className="badge badge-warning">Active</span> : <span className="badge badge-success">Completed</span>}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>
                Vehicle: <strong style={{ color: '#fff' }}>{s.vehicle_make}</strong>
              </p>
              <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>Connector: {s.connector_type}</p>
              
              <div style={{ fontSize: '0.85rem', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px' }}>
                <div>Start: {new Date(s.start_time).toLocaleString()}</div>
                {!isActive && <div>End: {new Date(s.end_time).toLocaleString()}</div>}
                {!isActive && <div style={{ color: 'var(--accent-primary)', marginTop: '4px', fontWeight: 600 }}>Delivered: {s.total_kwh_delivered} kWh</div>}
              </div>

              {isActive && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" step="0.1" className="premium-input" placeholder="kWh..." value={kw} onChange={e => setKw(e.target.value)} />
                  <button className="premium-btn" onClick={() => handleEnd(s.session_id)} style={{ padding: '8px 16px' }}>End</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {sessions.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No sessions found.</p>}
    </div>
  );
}
