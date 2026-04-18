import React, { useEffect, useState } from 'react';
import { getStations, getSessions, getPayments, getTickets } from '../api';

export default function Dashboard() {
  const [stations, setStations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tickets, setTickets]   = useState([]);

  useEffect(() => {
    getStations().then(r => setStations(r.data)).catch(console.error);
    getSessions().then(r => setSessions(r.data)).catch(console.error);
    getPayments().then(r => setPayments(r.data)).catch(console.error);
    getTickets().then(r => setTickets(r.data)).catch(console.error);
  }, []);

  const totalRevenue   = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
  const activeSessions = sessions.filter(s => !s.end_time).length;
  const openTickets    = tickets.filter(t => !t.closed_time).length;

  return (
    <div className="fade-in">
      <h1 className="page-title">Dashboard Overview</h1>
      <div className="grid-cards">
        <StatCard label="Total Stations" value={stations.length} icon="🏢" color="var(--accent-primary)" />
        <StatCard label="Total Sessions" value={sessions.length} icon="🔋" color="var(--accent-secondary)" />
        <StatCard label="Active Sessions" value={activeSessions} icon="⚡" color="var(--accent-warning)" />
        <StatCard label="Total Revenue" value={'Rs ' + totalRevenue.toFixed(2)} icon="💳" color="var(--accent-success)" />
        <StatCard label="Open Tickets" value={openTickets} icon="🛠️" color="var(--accent-danger)" />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ marginBottom: '20px' }}>Recent Activity</h2>
        <div className="glass-card" style={{ padding: '0' }}>
          <table className="premium-table">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Vehicle Subtype</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 5).map(s => (
                <tr key={s.session_id}>
                  <td>#{s.session_id}</td>
                  <td>{s.vehicle_make} - {s.connector_type}</td>
                  <td>
                    {s.end_time ? 
                      <span className="badge badge-success">Completed</span> : 
                      <span className="badge badge-warning">Charging</span>
                    }
                  </td>
                </tr>
              ))}
              {sessions.length === 0 && <tr><td colSpan="3" style={{ textAlign:'center' }}>No sessions yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="glass-card" style={{ borderTop: `4px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginTop: '8px' }}>{value}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '4px' }}>{label}</div>
        </div>
        <div style={{ fontSize: '2rem', opacity: 0.8 }}>{icon}</div>
      </div>
    </div>
  );
}
