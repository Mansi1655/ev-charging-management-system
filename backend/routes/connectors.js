const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List connectors
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, s.operator_name
      FROM Connector c
      JOIN Charging_Station s ON c.station_id = s.station_id
      ORDER BY c.connector_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add connector
router.post('/', async (req, res) => {
  const { connector_id, connector_type, max_power_kw, status_id, station_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO Connector VALUES ($1, $2, $3, $4, $5)`,
      [connector_id, connector_type, max_power_kw, status_id, station_id]
    );
    res.status(201).json({ message: 'Connector created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
