import jwt from "jsonwebtoken";
import { fetchData } from "../postgress/postgress.js";

// So'rovlarni log qilish uchun middleware
export const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Access tokenni tekshirish uchun middleware
export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "Access token kerak" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Noto'g'ri token" });
  }
};

// Refresh tokenni tekshirish uchun middleware
export const authenticateRefreshToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "Refresh token kerak" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Noto'g'ri refresh token" });
  }
};

// Mijozni tekshirish uchun middleware
export const validateCustomer = async (req, res, next) => {
  const { customerId } = req.params;
  const customer = await fetchData("SELECT * FROM customer WHERE id = $1", customerId);
  if (!customer.length) {
    return res.status(404).send({ message: "Mijoz topilmadi" });
  }
  next();
};

// Xatolarni boshqarish uchun middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Xato yuz berdi", error: err.message });
};

// Kategoriya yaratishda kiritilgan ma'lumotni tekshirish
export const validateCategoryInput = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).send({ message: "Kategoriya nomi kerak" });
  }
  next();
};

