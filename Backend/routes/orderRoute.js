import express from 'express';
const router = express.Router();
import { placeOrder, getUserOrders, getOrderById, getOrderSummary } from '../controllers/order.js';

// Order routes - verifyToken middleware is applied at app level in index.js
router.post('/summary', getOrderSummary);        // POST /api/orders/summary - Get order summary before placing
router.post('/', placeOrder);                    // POST /api/orders - Place new order
router.get('/', getUserOrders);                  // GET /api/orders - Get user's order history
router.get('/:orderId', getOrderById);           // GET /api/orders/:orderId - Get specific order details

export default router;
