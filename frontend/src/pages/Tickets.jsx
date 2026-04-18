import React, { useEffect, useState } from 'react';
import { getTickets, addTicket, closeTicket } from '../api';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({ ticket_id: '', station_id: '', issue_desc: '' });

  useEffect(() => { loadTickets(); }, []);
  const loadTickets = () => getTickets().then(r => setTickets(r.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket(formData).then(() => {
      loadTickets();
      setFormData({ ticket_id: '', station_id: '', issue_desc: '' });
    }).catch(console.error);
  };

  const handleClose = (id) => {
    closeTicket(id).then(loadTickets).catch(console.error);
  };

  return (
    <div className="fade-in">
      <h1 className="page-title">Maintenance Hub</h1>
      
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Open Ticket</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <input className="premium-input" placeholder="Ticket ID" type="number" required
                 value={formData.ticket_id} onChange={e => setFormData({...formData, ticket_id: e.target.value})} />
          <input className="premium-input" placeholder="Station ID" type="number" required
                 value={formData.station_id} onChange={e => setFormData({...formData, station_id: e.target.value})} />
          <input className="premium-input" placeholder="Issue Description" required style={{ flex: 1 }}
                 value={formData.issue_desc} onChange={e => setFormData({...formData, issue_desc: e.target.value})} />
          <button className="premium-btn" type="submit" style={{ background: 'var(--accent-danger)' }}>Create Alert</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <table className="premium-table">
          <thead><tr><th>ID</th><th>Station</th><th>Issue</th><th>Opened</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.ticket_id}>
                <td>#{t.ticket_id}</td>
                <td>{t.operator_name}</td>
                <td>{t.issue_desc}</td>
                <td>{new Date(t.opened_time).toLocaleString()}</td>
                <td>
                  {t.closed_time ? 
                    <span className="badge badge-success">Resolved</span> : 
                    <span className="badge badge-danger">Open ALERT</span>
                  }
                </td>
                <td>
                  {!t.closed_time && (
                    <button className="premium-btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'var(--accent-success)' }} 
                            onClick={() => handleClose(t.ticket_id)}>
                      Mark Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
