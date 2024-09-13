import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";
import { upload } from "../middleware/upload.js";
import {
  validateCreateBook,
  validateUpdateBook
} from "../middleware/validation.js";

export const bookRoutes = Router();

bookRoutes
  .get("/", getAllBooks)
  .post("/add", upload.single('image'), validateCreateBook, createBook) // 'image' - fayl maydoni nomi
  .get("/:bookId", getSingleBook)
  .patch("/update/:bookId", upload.single('image'), validateUpdateBook, updateBook) // 'image' - fayl maydoni nomi
  .delete("/delete/:bookId", deleteBook);



 