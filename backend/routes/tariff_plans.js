const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List tariff plans
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, s.operator_name
      FROM Tariff_Plan t
      JOIN Charging_Station s ON t.station_id = s.station_id
      ORDER BY t.plan_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add tariff plan
router.post('/', async (req, res) => {
  const { plan_id, station_id, price_per_kwh, tod_windows } = req.body;
  try {
    await pool.query(
      `INSERT INTO Tariff_Plan VALUES ($1, $2, $3, $4)`,
      [plan_id, station_id, price_per_kwh, tod_windows]
    );
    res.status(201).json({ message: 'Tariff Plan created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
