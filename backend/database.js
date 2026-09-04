import pg from 'pg';
import fs from 'node:fs/promises';
import path from 'node:path';

const { Pool } = pg;
export const databaseConfigured = Boolean(process.env.DATABASE_URL);
export const pool = databaseConfigured ? new Pool({ connectionString: process.env.DATABASE_URL, max: 5, idleTimeoutMillis: 10000 }) : null;

export async function initializeDatabase() {
  if (!pool) return false;
  const schema = await fs.readFile(path.join(process.cwd(), 'backend', 'schema.sql'), 'utf8');
  await pool.query(schema);
  return true;
}

export async function databaseHealth() {
  if (!pool) return { configured: false, connected: false };
  try {
    await pool.query('SELECT 1');
    return { configured: true, connected: true };
  } catch (error) {
    return { configured: true, connected: false, error: error.message };
  }
}

export async function closeDatabase() {
  if (pool) await pool.end();
}
