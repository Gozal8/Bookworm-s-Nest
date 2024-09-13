import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

export const authRoutes = Router();

authRoutes
  .post('/request-reset', requestPasswordReset)
  .post('/reset-password', authenticateToken, authorize(['admin', 'manager']), resetPassword);


