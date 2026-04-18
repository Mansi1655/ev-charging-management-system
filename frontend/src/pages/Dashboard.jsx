import React, { useEffect, useState } from 'react';
import { getStations, getSessions, getPayments } from '../api';

export default function Dashboard() {
  const [stations, setStations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getStations().then(r => setStations(r.data));
    getSessions().then(r => setSessions(r.data));
    getPayments().then(r => setPayments(r.data));
  }, []);

  const totalRevenue   = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
  const activeSessions = sessions.filter(s => !s.end_time).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
        <StatCard label="Total Stations" value={stations.length}                color="#1abc9c" />
        <StatCard label="Total Sessions" value={sessions.length}                color="#8e44ad" />
        <StatCard label="Active Now"     value={activeSessions}                 color="#e67e22" />
        <StatCard label="Total Revenue"  value={'Rs ' + totalRevenue.toFixed(2)} color="#2980b9" />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ background:color, color:'#fff', borderRadius:12, padding:'24px 32px', minWidth:180 }}>
      <div style={{ fontSize:36, fontWeight:700 }}>{value}</div>
      <div style={{ fontSize:14, marginTop:4 }}>{label}</div>
    </div>
  );
}




