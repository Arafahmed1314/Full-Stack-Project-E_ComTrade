import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
    createRequest,
    getIncomingRequests,
    getOutgoingRequests,
    getPendingCount,
    acceptRequest,
    declineRequest,
} from '../controllers/tradeRequest.js';

const router = express.Router();

// Create a request (buyer)
router.post('/', verifyToken, createRequest);

// Get incoming requests for current user (seller)
router.get('/incoming', verifyToken, getIncomingRequests);

// Get outgoing requests for current user (buyer)
router.get('/outgoing', verifyToken, getOutgoingRequests);

// Get pending count for dashboard/badge
router.get('/count', verifyToken, getPendingCount);

// Accept a request (seller only)
router.patch('/:id/accept', verifyToken, acceptRequest);

// Decline a request (seller only)
router.patch('/:id/decline', verifyToken, declineRequest);

export default router;
