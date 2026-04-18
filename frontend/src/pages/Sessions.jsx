import React, { useEffect, useState } from 'react';
import { getSessions, endSession } from '../api';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [kwh, setKwh] = useState({});

  const load = () => getSessions().then(r => setSessions(r.data));
  useEffect(() => { load(); }, []);

  const handleEnd = async (id) => {
    await endSession(id, kwh[id] || 0);
    load();
  };

  return (
    <div>
      <h2>Charging Sessions</h2>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:'#f0f0f0' }}>
            {['ID','Vehicle','Connector','Start','End','kWh','Action'].map(h => (
              <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s.session_id}>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.session_id}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.vehicle_make}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.connector_type}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{new Date(s.start_time).toLocaleString()}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.end_time ? new Date(s.end_time).toLocaleString() : <span style={{color:'orange'}}>Active</span>}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.total_kwh_delivered ?? '-'}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>
                {!s.end_time && (
                  <span style={{ display:'flex', gap:6 }}>
                    <input type="number" placeholder="kWh" style={{ width:70, padding:4, borderRadius:4, border:'1px solid #ccc' }}
                      onChange={e => setKwh({ ...kwh, [s.session_id]: e.target.value })} />
                    <button onClick={() => handleEnd(s.session_id)} style={{ padding:'6px 14px', background:'#e74c3c', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' }}>End</button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




