// db.js
// Creates a single shared connection pool using node-postgres (pg).
// All route files import this and call pool.query() directly.

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:     process.env.DB_PORT,
});

module.exports = pool;