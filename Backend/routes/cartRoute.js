import express from 'express';
const router = express.Router();
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart, getCartSummary } from '../controllers/cart.js';

// Cart routes - verifyToken middleware is applied at app level in index.js
router.post('/add', addToCart);
router.get('/', getCart);
router.get('/summary', getCartSummary);
router.put('/item/:itemId', updateCartItem);
router.delete('/item/:itemId', removeFromCart);
router.delete('/', clearCart);

export default router;