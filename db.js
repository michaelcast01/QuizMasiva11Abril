const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.kkhxtnopanruypyrkpbt',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: '1234',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('🟢 Conexión exitosa a Supabase PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en la conexión con la DB:', err);
  process.exit(-1);
});

module.exports = pool;
