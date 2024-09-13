import pkg from 'pg'; // `pg` modulini default import qilish
const { Pool } = pkg; // `Pool` ni default importdan olish
import { databaseConfig } from './config/database.config.js'; // Konfiguratsiya faylini import qilish

const pool = new Pool(databaseConfig);

export const fetchData = async (query, ...params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
};

      


  



