const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List energy meters
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, s.operator_name
      FROM Energy_Meter e
      JOIN Charging_Station s ON e.station_id = s.station_id
      ORDER BY e.meter_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add energy meter
router.post('/', async (req, res) => {
  const { meter_id, station_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO Energy_Meter VALUES ($1, $2)`,
      [meter_id, station_id]
    );
    res.status(201).json({ message: 'Energy Meter created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
