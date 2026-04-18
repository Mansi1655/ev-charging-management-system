# EV Charging Network Management System
**Complete Architecture & Workflow Documentation**

This document serves as your "cheat sheet" to explain exactly how you built this project, the architecture behind it, and the data relationships that make it resilient. Bring these points up to prove a deep understanding of full-stack engineering.

---

## 1. High-Level Architecture (The Stack)

Explain your project as a **3-Tier Application**:

1. **Frontend (Presentation Tier):** Built with **React.js**. It's a Single Page Application (SPA) utilizing `react-router-dom` for client-side routing. It communicates asynchronously with the backend using the `axios` library. 
2. **Backend (Logic Tier):** A RESTful API built on **Node.js** and **Express.js**. It handles all business logic, data validation, and routing. 
3. **Database (Data Tier):** A normalized relational database running on **PostgreSQL**. The backend connects to it via the `pg` (node-postgres) module using a connection pool for efficient resource management.

---

## 2. Database Schema & Relational Integrity

The crux of your project is an 11-table database that strictly enforces referential integrity. When explaining this, focus on how you structured the relations to avoid orphan records.

### The Core Hierarchies:

*   **The Grid Hierarchy:** 
    A `Charging_Station` cannot exist without grid infrastructure. Therefore, it holds solid 1-to-N relationships with `Discom` (Distribution Company) and `Transformer`. 
*   **The Hardware Hierarchy:**
    A `Charging_Station` can have multiple `Connectors` (e.g., a station has two CCS2 ports and one Type 2 AC port). If a station is deleted, the connectors are deleted via `ON DELETE CASCADE`.
*   **The User Hierarchy:**
    A `User` owns multiple `Vehicles`. Vehicles are linked to the user's KYC status.
*   **The Operational Hierarchy:**
    A `Charging_Session` is the transactional bridge. It links the `Vehicle` (consumer) to the `Connector` (provider). 
*   **The Financial Hierarchy:**
    The `Payment` table has a strict **1-to-1 relationship** with a `Charging_Session` (enforced using a `UNIQUE` constraint on `session_id`). 

### Why you chose PostgreSQL:
*To sound professional:* "I chose PostgreSQL because EV charging requires rigid transactional integrity. I needed strict `FOREIGN KEY` constraints and triggers to ensure things like—you cannot process a Payment for a Charging Session that hasn't finished, or you cannot link an Energy Meter to a non-existent station."

---

## 3. Backend Workflow & Design Patterns

### Connection Pooling (`db.js`)
Instead of opening a new database connection for every single HTTP request, you configured a **Connection Pool** (`const { Pool } = require('pg')`).
*   *Explanation:* "I implemented connection pooling so the backend can handle multiple simultaneous incoming API calls without exhausting database resources."

### Modular Routing (`routes/`)
Your `server.js` is incredibly clean. All business logic is stripped out into modular domain files (`routes/stations.js`, `routes/users.js`, etc.).
*   *Explanation:* "I used Express Routers to modularize my endpoints. This makes the codebase scalable; if I bring on another developer, they know exactly where the billing logic is versus the hardware logic."

### The Data Flow for a GET Request:
1. React component calls `axios.get('/api/stations')`.
2. The request hits `server.js` and is routed to `routes/stations.js`.
3. The Express router executes an asynchronous `pool.query('SELECT...')` joined with the `Discom` table to get human-readable names.
4. The result is parsed from SQL rows to a JSON array and sent back with a `200 OK` status.

---

## 4. Frontend Design Decisions

### State Management
You used React Hooks (`useState`, `useEffect`) to manage component lifecycle and state tightly.
*   *Explanation:* "I kept my components decoupled. Upon mounting, `useEffect` asynchronously fetches data via my `api.js` abstraction layer. While waiting, the UI remains responsive."

### Custom CSS System over UI Libraries
Instead of taking the easy route and using a library like Material-UI or Tailwind, you built a custom CSS architecture.
*   *Explanation:* "I wanted pixel-perfect control and a modern, high-performance 'glassmorphism' aesthetic. By defining CSS Custom Properties (`:root` variables) for colors, fonts, and box-shadows, I created a central design token system. It utilizes GPU-accelerated CSS like `backdrop-filter: blur()`, giving the app a premium dashboard feel with zero overhead."

---

## 5. Walkthrough of an EV Charging Lifecycle (The "Happy Path")

To summarize the project to a professional, walk them through the life of a single electron:

1. **Infrastructure:** The Admin registers a `Discom` and a `Transformer`. They use these IDs to deploy a physical `Charging_Station`.
2. **Hardware:** The Admin attaches `Connectors` (like a 50kW CCS2) to that station. They also attach a `Tariff_Plan` to dictate the Time-of-Day pricing, and an `Energy_Meter` to audit grid usage.
3. **Customer Setup:** A `User` registers on the system and adds their `Vehicle` (e.g., an MG ZS EV). Their KYC is verified.
4. **The Transaction (Session):** The user drives to the station. A `Charging_Session` is generated, linking their Vehicle ID to the Connector ID. The `start_time` is recorded.
5. **Completion:** When the battery is full, a PUT request hits the backend ending the session. The backend stamps the `end_time` and dynamically records the `total_kwh_delivered`.
6. **Settlement:** A `Payment` is generated against the session based on the stored Tariff Plan.

### Handling Failure (Maintenance Track)
If a connector screen breaks, an Admin opens a `Maintenance_Ticket` against the station. The React frontend instantly flags this as a red "Open ALERT" on the dashboard grid. When the technician fixes it, a PUT request marks the `closed_time`, updating the UI instantly.
