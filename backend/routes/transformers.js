const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List transformers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM Transformer ORDER BY transformer_id`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add transformer
router.post('/', async (req, res) => {
  const { transformer_id, capacity_kva, feeder_name } = req.body;
  try {
    await pool.query(
      `INSERT INTO Transformer VALUES ($1, $2, $3)`,
      [transformer_id, capacity_kva, feeder_name]
    );
    res.status(201).json({ message: 'Transformer created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
