// routes/payments.js
// GET /api/payments → all payments joined with session info

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.payment_id, p.amount, p.payment_method,
             cs.start_time, cs.total_kwh_delivered
      FROM Payment p
      JOIN Charging_Session cs ON p.session_id = cs.session_id
      ORDER BY p.payment_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;