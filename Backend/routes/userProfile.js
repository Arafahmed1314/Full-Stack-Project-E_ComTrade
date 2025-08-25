import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// All routes in this file require authentication
router.use(verifyToken);

// Add logging middleware for all profile routes
router.use((req, res, next) => {
    console.log(`Profile route accessed: ${req.method} ${req.path}`);
    console.log('User ID:', req.userId);
    next();
});

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
            phone: req.user.phone,
            address: req.user.address,
            lastLogin: req.user.lastLogin,
            registrationType: req.user.googleId ? 'google' : 'manual'
        }
    });
});

// Update user profile
router.put("/", async (req, res) => {
    try {
        const { name, avatar, phone, address } = req.body;
        console.log('Profile update request body:', { name, avatar: avatar ? 'base64 image' : null, phone, address });

        const user = await User.findById(req.userId);
        console.log('User before update:', {
            id: user._id,
            name: user.name,
            phone: user.phone,
            address: user.address
        });

        if (name) user.name = name;
        if (avatar) user.avatar = avatar;
        if (phone !== undefined) user.phone = phone; // Allow empty string to clear phone
        if (address !== undefined) user.address = address; // Allow empty string to clear address

        await user.save();

        const responseData = {
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                phone: user.phone,
                address: user.address
            }
        };

        console.log('Profile update response:', {
            ...responseData,
            user: { ...responseData.user, avatar: responseData.user.avatar ? 'base64 image' : null }
        });

        res.json(responseData);
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
