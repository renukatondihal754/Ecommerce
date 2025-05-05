const { Pool } = require('pg');

// Create a new pool with the PostgreSQL connection config
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Export the pool for use in other parts of the app
module.exports = pool;
