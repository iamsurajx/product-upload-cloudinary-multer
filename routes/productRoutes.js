import express from 'express';
import multer from 'multer';
import {
  createProduct,
  getAllProducts,
} from '../controllers/productController.js';

const router = express.Router();

// Multer setup to save files to 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);

export default router;
