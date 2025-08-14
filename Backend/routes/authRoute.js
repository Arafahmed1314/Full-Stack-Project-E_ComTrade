import express from "express";
import { loginUser, registerUser, logOut, verifyTokenRoute } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut); // Added logout route

// Minimal protected route for session validation
router.get("/verify-token", verifyToken, verifyTokenRoute);

export default router;