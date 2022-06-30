import { Pool } from 'pg';

export const pool = new Pool();

export function connect() {
  pool.connect();
}
