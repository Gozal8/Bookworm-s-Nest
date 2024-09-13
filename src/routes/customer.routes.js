import { Router } from 'express';
import { createCustomer, deleteCustomer, getCustomerData, updateCustomer } from '../controllers/customerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

export const customerRoutes = Router();

customerRoutes
  .get('/', authenticateToken, authorize(['admin', 'manager']), getCustomerData)
  .post('/add', authenticateToken, authorize(['admin']), createCustomer)
  .patch("/update/:customerId", authenticateToken, authorize(['admin', 'manager']), updateCustomer)
  .delete("/delete/:customerId", authenticateToken, authorize(['admin']), deleteCustomer);


   