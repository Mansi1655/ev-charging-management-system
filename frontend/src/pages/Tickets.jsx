import React, { useEffect, useState } from 'react';
import { getTickets, addTicket, closeTicket } from '../api';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ ticket_id:'', station_id:'', issue_desc:'' });

  const load = () => getTickets().then(r => setTickets(r.data));
  useEffect(() => { load(); }, []);

  const handleAdd   = async () => { await addTicket(form); load(); };
  const handleClose = async (id) => { await closeTicket(id); load(); };

  return (
    <div>
      <h2>Maintenance Tickets</h2>
      <div style={{ display:'flex', gap:8, marginBottom:24 }}>
        {['ticket_id','station_id','issue_desc'].map(k => (
          <input key={k} placeholder={k} value={form[k]}
            onChange={e => setForm({ ...form, [k]: e.target.value })}
            style={{ padding:'8px 12px', borderRadius:6, border:'1px solid #ccc', flex: k === 'issue_desc' ? 2 : 1 }}
          />
        ))}
        <button onClick={handleAdd} style={{ padding:'8px 20px', background:'#8e44ad', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' }}>Open Ticket</button>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:'#f0f0f0' }}>
            {['ID','Station','Issue','Opened','Closed','Action'].map(h => (
              <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.ticket_id}>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{t.ticket_id}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{t.operator_name}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{t.issue_desc}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{new Date(t.opened_time).toLocaleString()}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{t.closed_time ? new Date(t.closed_time).toLocaleString() : <span style={{color:'orange'}}>Open</span>}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>
                {!t.closed_time && (
                  <button onClick={() => handleClose(t.ticket_id)} style={{ padding:'6px 14px', background:'#8e44ad', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' }}>Close</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





