import express from "express";
import { loginUser, registerUser, verifyTokenRoute } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Minimal protected route for session validation
router.get("/verify-token", verifyToken, verifyTokenRoute);

export default router;