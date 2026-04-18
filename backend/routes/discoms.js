const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List discoms
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM Discom ORDER BY discom_id`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add discom
router.post('/', async (req, res) => {
  const { discom_id, discom_name } = req.body;
  try {
    await pool.query(`INSERT INTO Discom VALUES ($1, $2)`, [discom_id, discom_name]);
    res.status(201).json({ message: 'Discom created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
