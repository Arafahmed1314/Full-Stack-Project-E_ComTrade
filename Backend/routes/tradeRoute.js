import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/authMiddleware.js';
import {
    createPost,
    getAllPosts,
    getUserPosts,
    getPostById,
    deletePost
} from '../controllers/trade.js';

// Public - list all posts
router.get('/posts', getAllPosts);

// Protected - get posts of current user
router.get('/posts/user', verifyToken, getUserPosts);

// Public - single post
router.get('/posts/:id', getPostById);

// Protected - create a new post
router.post('/posts', verifyToken, createPost);


// Protected - delete a post (owner only logic should be in controller)
router.delete('/posts/:id', verifyToken, deletePost);

export default router;
