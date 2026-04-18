import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Existing Pages
import Dashboard from './pages/Dashboard';
import Stations  from './pages/Stations';
import Sessions  from './pages/Sessions';
import Tickets   from './pages/Tickets';

// New Pages
import Discoms from './pages/Discoms';
import Users from './pages/Users';
import Vehicles from './pages/Vehicles';
import Transformers from './pages/Transformers';
import Connectors from './pages/Connectors';
import EnergyMeters from './pages/EnergyMeters';
import TariffPlans from './pages/TariffPlans';

function App() {
  const getNavClass = ({ isActive }) => isActive ? "nav-item active" : "nav-item";

  return (
    <Router>
      <div className="app-container">
        {/* SIDEBAR */}
        <nav className="sidebar">
          <div className="sidebar-header">
            <div className="logo-icon">⚡</div>
            EV Admin
          </div>
          <div className="nav-links custom-scrollbar">
            <NavLink to="/" className={getNavClass}>📊 Dashboard</NavLink>
            <div style={{ padding: '16px 16px 8px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px' }}>Core Schema</div>
            <NavLink to="/discoms" className={getNavClass}>🏢 Discoms</NavLink>
            <NavLink to="/users" className={getNavClass}>👥 Users</NavLink>
            <NavLink to="/vehicles" className={getNavClass}>🚙 Vehicles</NavLink>
            <NavLink to="/transformers" className={getNavClass}>⚡ Transformers</NavLink>
            <div style={{ padding: '16px 16px 8px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px' }}>Operations</div>
            <NavLink to="/stations" className={getNavClass}>🏢 Stations</NavLink>
            <NavLink to="/connectors" className={getNavClass}>🔌 Connectors</NavLink>
            <NavLink to="/sessions" className={getNavClass}>🔋 Sessions</NavLink>
            <NavLink to="/energymeters" className={getNavClass}>📟 Energy Meters</NavLink>
            <NavLink to="/tariffplans" className={getNavClass}>💳 Tariff Plans</NavLink>
            <NavLink to="/tickets" className={getNavClass}>🛠️ Maintenance</NavLink>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/discoms" element={<Discoms />} />
            <Route path="/users" element={<Users />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/transformers" element={<Transformers />} />
            <Route path="/connectors" element={<Connectors />} />
            <Route path="/energymeters" element={<EnergyMeters />} />
            <Route path="/tariffplans" element={<TariffPlans />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
