import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { logRequest, authenticate, validateCustomer } from "../middleware/middleware.js";

export const orderRoutes = Router();

orderRoutes
  .use(logRequest)                       // Har bir so'rovni log qilish
  .get("/", authenticate, getAllOrders)  // Barcha buyurtmalarni olish
  .get("/:id", authenticate, getOrderById)  // ID bo'yicha buyurtmani olish
  .post("/add", validateCustomer, createOrder) // Mijozni tekshirish va buyurtma qo'shish
  .patch("/update/:id", authenticate, updateOrder) // Buyurtmani yangilash
  .delete("/delete/:id", authenticate, deleteOrder); // Buyurtmani o'chirish


