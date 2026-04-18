import React, { useEffect, useState } from 'react';
import { getStations, addStation } from '../api';

export default function Stations() {
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({ station_id:'', operator_name:'', latitude:'', longitude:'', discom_id:'', transformer_id:'' });

  const load = () => getStations().then(r => setStations(r.data));
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    await addStation(form);
    load();
    setForm({ station_id:'', operator_name:'', latitude:'', longitude:'', discom_id:'', transformer_id:'' });
  };

  return (
    <div>
      <h2>Charging Stations</h2>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
        {['station_id','operator_name','latitude','longitude','discom_id','transformer_id'].map(k => (
          <input key={k} placeholder={k} value={form[k]}
            onChange={e => setForm({ ...form, [k]: e.target.value })}
            style={{ padding:'8px 12px', borderRadius:6, border:'1px solid #ccc' }}
          />
        ))}
        <button onClick={handleAdd} style={{ padding:'8px 20px', background:'#1abc9c', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' }}>Add Station</button>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:'#f0f0f0' }}>
            {['ID','Operator','Latitude','Longitude','Discom'].map(h => (
              <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stations.map(s => (
            <tr key={s.station_id}>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.station_id}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.operator_name}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.latitude}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.longitude}</td>
              <td style={{ padding:'10px 14px', borderBottom:'1px solid #eee' }}>{s.discom_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




