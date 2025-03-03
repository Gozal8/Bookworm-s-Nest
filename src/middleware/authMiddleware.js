import jwt from 'jsonwebtoken';
import { fetchData } from '../utils/fetchData.js';

// Tokenni tekshirish
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; // Foydalanuvchi ma’lumotlarini qo‘shish
    next();
  });
};
