import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkAdmin } from '../middlewares/adminMiddleware.js';
import { createProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/admin.js';
router.post('/products', verifyToken, checkAdmin, createProduct);
router.put('/products/:id', verifyToken, checkAdmin, updateProduct);
router.delete('/products/:id', verifyToken, checkAdmin, deleteProduct);
router.get('/products', verifyToken, checkAdmin, getAllProducts);

export default router;