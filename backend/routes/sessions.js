// routes/sessions.js
// GET /api/sessions         → all sessions with vehicle make + connector type
// POST /api/sessions        → start a new session
// PUT /api/sessions/:id/end → end a session (set end_time + kwh)

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cs.session_id, cs.start_time, cs.end_time,
             cs.total_kwh_delivered,
             v.make AS vehicle_make,
             c.connector_type
      FROM Charging_Session cs
      JOIN Vehicle v   ON cs.vehicle_id   = v.vehicle_id
      JOIN Connector c ON cs.connector_id = c.connector_id
      ORDER BY cs.start_time DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start a session (end_time and kwh are NULL initially)
router.post('/', async (req, res) => {
  const { session_id, vehicle_id, connector_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO Charging_Session (session_id, start_time, vehicle_id, connector_id)
       VALUES ($1, NOW(), $2, $3)`,
      [session_id, vehicle_id, connector_id]
    );
    res.status(201).json({ message: 'Session started' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// End a session — sets end_time and total kWh delivered
router.put('/:id/end', async (req, res) => {
  const { total_kwh_delivered } = req.body;
  try {
    await pool.query(
      `UPDATE Charging_Session
       SET end_time = NOW(), total_kwh_delivered = $1
       WHERE session_id = $2`,
      [total_kwh_delivered, req.params.id]
    );
    res.json({ message: 'Session ended' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;