import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// All routes in this file require authentication
router.use(verifyToken);

// Get user profile
router.get("/", (req, res) => {
    res.json({
        message: "Profile retrieved successfully",
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            emailVerified: req.user.emailVerified,
            avatar: req.user.avatar,
            lastLogin: req.user.lastLogin,
            registrationType: req.user.googleId ? 'google' : 'manual'
        }
    });
});

// Update user profile
router.put("/", async (req, res) => {
    try {
        const { name, avatar } = req.body;
        const user = await User.findById(req.userId);

        if (name) user.name = name;
        if (avatar) user.avatar = avatar;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});

// Change password (only for manual registration users)
router.put("/change-password", async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.userId);

        // Check if user has Google account
        if (user.googleId) {
            return res.status(400).json({ message: "Google users cannot change password" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Update password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error changing password", error: error.message });
    }
});

export default router;
