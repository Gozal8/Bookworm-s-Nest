import { body, validationResult } from "express-validator";

// Mijoz yaratishda validatsiya
export const validateCreateCustomer = [
  body('full_name').isString().notEmpty().withMessage('Ism va familiya kerak'),
  body('email').isEmail().withMessage('Togri email kiriting'),
  body('phone_number').isString().notEmpty().withMessage('Telefon raqam kerak'),
  body('password').isString().isLength({ min: 6 }).withMessage('Parol kamida 6 ta belgidan iborat bolishi kerak'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Mijoz yangilashda validatsiya
export const validateUpdateCustomer = [
  body('full_name').optional().isString().notEmpty().withMessage('Ism va familiya kerak'),
  body('email').optional().isEmail().withMessage('Togri email kiriting'),
  body('phone_number').optional().isString().notEmpty().withMessage('Telefon raqam kerak'),
  body('password').optional().isString().isLength({ min: 6 }).withMessage('Parol kamida 6 ta belgidan iborat bolishi kerak'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Kategoriya yaratishda validatsiya
export const validateCreateCategory = [
  body('name').isString().notEmpty().withMessage('Kategoriya nomi kerak'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Mahsulot yaratishda validatsiya
export const validateCreateProduct = [
  body('title').isString().notEmpty().withMessage('Mahsulot nomi kerak'),
  body('description').isString().notEmpty().withMessage('Mahsulot tarifi kerak'),
  body('price').isFloat({ gt: 0 }).withMessage('Togri narx kiriting'),
  body('category_id').isInt().withMessage('Togri kategoriya ID kerak'),
  body('count').isInt({ gt: 0 }).withMessage('Togri mahsulot miqdori kerak'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


// Kitob yaratishda validatsiya
export const validateCreateBook = [
    body('title').isString().notEmpty().withMessage('Kitob nomi kerak'),
    body('author').isString().notEmpty().withMessage('Muallif kerak'),
    body('price').isFloat({ gt: 0 }).withMessage('Togri narx kiriting'),
    body('category_id').isInt().withMessage('Togri kategoriya ID kerak'),
    body('image_url').optional().isString().withMessage('Rasm URLi kerak'),
    (req, res, next) => {
      const errors = validationResult(req);  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  
  // Kitob yangilashda validatsiya
  export const validateUpdateBook = [
    body('title').optional().isString().notEmpty().withMessage('Kitob nomi kerak'),
    body('author').optional().isString().notEmpty().withMessage('Muallif kerak'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Togri narx kiriting'),
    body('category_id').optional().isInt().withMessage('Togri kategoriya ID kerak'),
    body('image_url').optional().isString().withMessage('Rasm URLi kerak'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  
 