import { fetchData } from '../utils/fetchData.js';

// Role-Based Access Control Middleware
export const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.user.id; // Token orqali foydalanuvchi ID ni olish
    const userRoles = await fetchData('SELECT role FROM user_roles WHERE user_id = $1', userId);

    const userRolesSet = new Set(userRoles.map(role => role.role));

    // Ruxsat berilgan rollarni tekshirish
    const hasAccess = allowedRoles.some(role => userRolesSet.has(role));

    if (!hasAccess) {
      return res.status(403).send({ message: 'Access denied' });
    }

    next();
  };
};
