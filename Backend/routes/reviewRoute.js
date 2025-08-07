import express from 'express';
const router = express.Router();
import { addReview, getProductReviews, getUserReviews, updateReview, deleteReview } from '../controllers/review.js';

// Review routes - verifyToken middleware is applied at app level in index.js
router.post('/', addReview);
router.get('/product/:productId', getProductReviews);
router.get('/user', getUserReviews);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);


export default router;
