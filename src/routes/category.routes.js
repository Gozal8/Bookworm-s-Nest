  import { Router } from 'express';
  import {
    createCategory,
    deleteCategory,
    getAllCategory,
  } from '../controllers/categoryController.js';
  import { authenticateToken } from '../middleware/authMiddleware.js';
  import { authorize } from '../middleware/roleMiddleware.js';
  
  export const categoryRoutes = Router();
  
  categoryRoutes
    .get("/", authenticateToken, authorize(['admin', 'manager']), getAllCategory)
    .post("/add", authenticateToken, authorize(['admin']), createCategory)
    .delete("/delete/:categoryId", authenticateToken, authorize(['admin']), deleteCategory);
  