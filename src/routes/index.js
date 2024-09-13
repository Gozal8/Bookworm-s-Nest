import { Router } from "express";
import { categoryRoutes } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";
import { customerRoutes } from "./customer.routes.js";
import { orderRoutes } from "./order.routes.js";
import { bookRoutes } from "./book.routes.js";
import { authRoutes } from "./auth.routes.js";

export const routes = Router();

routes
  .use("/categories", categoryRoutes)
  .use("/customers", customerRoutes)
  .use("/products", productRoutes)
  .use("/orders", orderRoutes)
  .use("/books", bookRoutes)
  .use("/auth", authRoutes);  

  