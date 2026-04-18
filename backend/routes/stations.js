// routes/stations.js
// GET /api/stations        → list all stations with their discom name
// GET /api/stations/:id    → one station with its connectors
// POST /api/stations       → add a new station
// PUT /api/stations/:id    → update operator name
// DELETE /api/stations/:id → delete a station

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List all stations, joined with Discom for the name
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cs.*, d.discom_name
      FROM Charging_Station cs
      JOIN Discom d ON cs.discom_id = d.discom_id
      ORDER BY cs.station_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// One station + its connectors
router.get('/:id', async (req, res) => {
  try {
    const station = await pool.query(
      'SELECT * FROM Charging_Station WHERE station_id = $1',
      [req.params.id]
    );
    const connectors = await pool.query(
      'SELECT * FROM Connector WHERE station_id = $1',
      [req.params.id]
    );
    res.json({ station: station.rows[0], connectors: connectors.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new station
router.post('/', async (req, res) => {
  const { station_id, operator_name, latitude, longitude, discom_id, transformer_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO Charging_Station VALUES ($1,$2,$3,$4,$5,$6)`,
      [station_id, operator_name, latitude, longitude, discom_id, transformer_id]
    );
    res.status(201).json({ message: 'Station created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update operator name
router.put('/:id', async (req, res) => {
  const { operator_name } = req.body;
  try {
    await pool.query(
      'UPDATE Charging_Station SET operator_name=$1 WHERE station_id=$2',
      [operator_name, req.params.id]
    );
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a station
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Charging_Station WHERE station_id=$1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;