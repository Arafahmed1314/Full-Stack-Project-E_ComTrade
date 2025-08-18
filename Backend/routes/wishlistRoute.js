import express from 'express';
const router = express.Router();
import { addToWishlist, getWishlist, removeFromWishlist, clearWishlist } from '../controllers/wishlist.js';

router.post('/add', addToWishlist);          // POST /api/wishlist/add - Add item to wishlist
router.get('/', getWishlist);                // GET /api/wishlist - Get user's wishlist
router.delete('/item/:productId', removeFromWishlist); // DELETE /api/wishlist/item/:productId - Remove item from wishlist
router.delete('/', clearWishlist);           // DELETE /api/wishlist - Clear wishlist
export default router;