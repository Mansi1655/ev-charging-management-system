# ⚡ EV Charging Management System

A full-stack, highly scalable Electric Vehicle (EV) Grid Management platform built for modern distribution networks. 

This platform allows administrators to govern the complex web of relationships between Power Distribution Companies (Discoms), localized Grid Transformers, physical Charging Stations, and Live Charging Sessions processing active energy metrics.

## 🌟 Key Features
- **Extensive Relational Hierarchy**: Manage 11 distinct but fully connected entities ranging from `Discoms` and `Transformers` down to individual `Connectors` and `Energy Meters`.
- **Live Session Tracking**: Simulate and monitor active EV charging sessions, computing timestamps against total $kWh$ delivered.
- **Maintenance Ticketing Engine**: In-app physical hardware management via open/close time-stamped alerts.
- **Dynamic Premium UI**: A highly responsive, pure-CSS "Glassmorphism" interface employing dark-mode neon aesthetics and smooth micro-animations.
- **Advanced State Management**: Granular React rendering powered by `useState` and `useEffect` operating over an asynchronous Axios abstraction layer.

## 🛠️ Tech Stack
- **Frontend Layer:** React.js, React-Router-Dom, Axios, Custom Glassmorphism CSS Framework.
- **Backend API Layer:** Node.js, Express.js, CORS.
- **Database Layer:** PostgreSQL (via `pg` node-postgres connection pooling).

## 🗄️ Database Schema & Integrity Core
The backbone of this application is a strict, fully-normalized relational PostgreSQL schema guaranteeing referential integrity via cascade rules.
* **1:N Relationships**: `Discom` ➔ `Charging Station` ➔ `Connectors` ➔ `Charging Sessions`
* **1:1 Relationships**: `Charging Session` ➔ `Payment`
* **Lookup Entities**: `Vehicles`, `Users`, `Tariff Plans`, `Energy Meters`.

## 🚀 Quick Start (Local Deployment)

### 1. Database Setup
A `schema.sql` and data-hydrating `seed.sql` script are provided in the repository root.
1. Create a logical database in PostgreSQL (e.g., `ev_charging_db`).
2. Run `schema.sql` to build the 11-table DDL hierarchy.
3. Run `seed.sql` to populate the grid with realistic testing infrastructures.

### 2. Backend Initialization
```bash
cd backend
# Create your .env file with DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT
npm install
npm start 
# -> Server running on port 5000
```

### 3. Frontend Initialization
```bash
cd frontend
npm install
npm start
# -> Launches the dashboard at http://localhost:3000
```

## 🧠 Architectural Highlights
Designed specifically to decouple business logic from presentation, the Express REST API securely handles complex join queries before returning sanitized JSON arrays. The connection pool prevents throttling under extensive load, maintaining sub-second query responses for live React UI hydration.

---
*Built from the ground up to solve complex modern energy infrastructure management problems.*
