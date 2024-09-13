import { Router } from 'express';
import {
  createProduct,
  getAllProduct,
  getProductsByCategory,
  getSingleProduct,
  getOverduePayments,
} from '../controllers/product.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

export const productRoutes = Router();

productRoutes
  .get("/", authenticateToken, authorize(['admin', 'manager', 'user']), getAllProduct)
  .get("/by/category/:categoryId", authenticateToken, authorize(['admin', 'manager', 'user']), getProductsByCategory)
  .get("/:productId", authenticateToken, authorize(['admin', 'manager', 'user']), getSingleProduct)
  .post("/add", authenticateToken, authorize(['admin']), createProduct)
  .get("/overdue-payments", authenticateToken, authorize(['admin']), getOverduePayments);
