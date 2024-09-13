import pkg from 'pg'; // `pg` modulini default import qilish
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();   

const pool =new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const fetchData = async (query, ...params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();   
  }
};

