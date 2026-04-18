const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// List users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM "User" ORDER BY user_id`); // Quoted because User is a reserved keyword in some SQL variants
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add user
router.post('/', async (req, res) => {
  const { user_id, kyc_status } = req.body;
  try {
    await pool.query(`INSERT INTO "User" VALUES ($1, $2)`, [user_id, kyc_status]);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
