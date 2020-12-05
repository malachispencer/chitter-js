const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  port: 5432,
  database: 'chitter'
});

module.exports = pool;