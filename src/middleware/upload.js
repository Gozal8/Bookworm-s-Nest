import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Fayl saqlash joyini va nomini belgilash
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Fayllar qayerga saqlanadi
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Fayl nomi va kengaytmasi
  }
});

// Multer middleware'ini yaratish
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Maksimal fayl hajmi (5MB)
});
