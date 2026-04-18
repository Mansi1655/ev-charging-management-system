import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Stations  from './pages/Stations';
import Sessions  from './pages/Sessions';
import Tickets   from './pages/Tickets';

function App() {
  return (
    <Router>
      <nav style={{ background:'#1a1a2e', padding:'16px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <strong style={{ color:'#fff', fontSize:18 }}>⚡ EV Charging Admin</strong>
        <div style={{ display:'flex', gap:24 }}>
          <Link to="/"         style={{ color:'#a3e4d7', textDecoration:'none', fontWeight:500 }}>Dashboard</Link>
          <Link to="/stations" style={{ color:'#a3e4d7', textDecoration:'none', fontWeight:500 }}>Stations</Link>
          <Link to="/sessions" style={{ color:'#a3e4d7', textDecoration:'none', fontWeight:500 }}>Sessions</Link>
          <Link to="/tickets"  style={{ color:'#a3e4d7', textDecoration:'none', fontWeight:500 }}>Maintenance</Link>
        </div>
      </nav>
      <div style={{ padding:32 }}>
        <Routes>
          <Route path="/"         element={<Dashboard />} />
          <Route path="/stations" element={<Stations />}  />
          <Route path="/sessions" element={<Sessions />}  />
          <Route path="/tickets"  element={<Tickets />}   />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
