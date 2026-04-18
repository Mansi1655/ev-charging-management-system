// routes/tickets.js
// GET /api/tickets        → all maintenance tickets with station name
// POST /api/tickets       → open a new ticket
// PUT /api/tickets/:id    → close a ticket (set closed_time)

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT mt.*, cs.operator_name
      FROM Maintenance_Ticket mt
      JOIN Charging_Station cs ON mt.station_id = cs.station_id
      ORDER BY mt.opened_time DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { ticket_id, station_id, issue_desc } = req.body;
  try {
    await pool.query(
      `INSERT INTO Maintenance_Ticket (ticket_id, station_id, issue_desc, opened_time)
       VALUES ($1, $2, $3, NOW())`,
      [ticket_id, station_id, issue_desc]
    );
    res.status(201).json({ message: 'Ticket opened' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await pool.query(
      `UPDATE Maintenance_Ticket SET closed_time = NOW() WHERE ticket_id = $1`,
      [req.params.id]
    );
    res.json({ message: 'Ticket closed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;