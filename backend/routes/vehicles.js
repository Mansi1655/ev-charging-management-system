const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List vehicles
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, u.kyc_status 
      FROM Vehicle v
      JOIN "User" u ON v.user_id = u.user_id
      ORDER BY v.vehicle_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add vehicle
router.post('/', async (req, res) => {
  const { vehicle_id, make, battery_capacity, user_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO Vehicle VALUES ($1, $2, $3, $4)`, 
      [vehicle_id, make, battery_capacity, user_id]
    );
    res.status(201).json({ message: 'Vehicle created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
