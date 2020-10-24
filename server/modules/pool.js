const pg = require('pg');

const Pool = pg.Pool;
const pool = new POOL({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('Pool Connected');
});

pool.on('error', (err) => {
  console.log('Pool Error: ', err);
});

module.exports = pool;
