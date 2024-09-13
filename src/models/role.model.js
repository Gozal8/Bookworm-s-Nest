import { fetchData } from '../utils/fetchData.js';

// Rollarni olish
export const getRoles = async () => {
  return await fetchData('SELECT * FROM roles');
};

// Rolarni yaratish
export const createRole = async (name) => {
  return await fetchData('INSERT INTO roles (name) VALUES ($1) RETURNING *', name);
};
      