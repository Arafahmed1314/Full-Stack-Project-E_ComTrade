import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateAuthToken, getCookieOptions } from "../utils/jwt.js";

// Single registration endpoint that handles both manual and Google registration
const registerUser = async (req, res) => {
    const { name, email, password, googleId, avatar, registrationType } = req.body;

    // Basic email validation
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        let userData = { name, email };

        // Handle different registration types
        if (registrationType === 'google' || googleId) {
            // Google registration
            userData.googleId = googleId;
            userData.avatar = avatar;
            userData.emailVerified = true; // Google emails are pre-verified
        } else {
            // Manual registration
            if (!password) {
                return res.status(400).json({ message: "Password is required for manual registration" });
            }
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters long" });
            }
            userData.password = await bcrypt.hash(password, 10);
            userData.emailVerified = false; // Manual registration needs email verification
        }

        const user = new User(userData);
        await user.save();

        // Generate JWT token for immediate login after registration
        const token = generateAuthToken(user);

        // Set token in HTTP-only cookie
        res.cookie('authToken', token, getCookieOptions());

        res.status(201).json({
            message: "User registered successfully",
            token: token, // Also send in response for localStorage option
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                registrationType: googleId ? 'google' : 'manual'
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error: error.message });
    }
}

// Single login endpoint that handles both manual and Google login
const loginUser = async (req, res) => {
    const { email, password, googleId, loginType } = req.body;

    // Basic email validation
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if account is active
        if (!user.isActive) {
            return res.status(400).json({ message: "Account is deactivated" });
        }

        // Handle different login types
        if (loginType === 'google' || googleId) {
            // Google login verification
            if (!user.googleId) {
                return res.status(400).json({ message: "This account is not linked to Google. Please use manual login." });
            }
            if (user.googleId !== googleId) {
                return res.status(400).json({ message: "Invalid Google credentials" });
            }
        } else {
            // Manual login verification
            if (!password) {
                return res.status(400).json({ message: "Password is required for manual login" });
            }
            if (!user.password) {
                return res.status(400).json({ message: "This account uses Google login. Please sign in with Google." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        }

        // Update last login time
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = generateAuthToken(user);

        // Set token in HTTP-only cookie
        res.cookie('authToken', token, getCookieOptions());

        res.status(200).json({
            message: "User logged in successfully",
            token: token, // Also send in response for localStorage option
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                avatar: user.avatar,
                lastLogin: user.lastLogin,
                registrationType: user.googleId ? 'google' : 'manual'
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Error logging in user", error: error.message });
    }
}
const logOut = async (req, res) => {
    try {
        // Clear the auth token cookie with the same options used when setting it
        const cookieOptions = getCookieOptions();
        // Override maxAge to expire immediately
        cookieOptions.maxAge = 0;

        res.clearCookie('authToken', cookieOptions);
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error logging out user", error: error.message });
    }
};

// Verify token for automatic login
const verifyTokenRoute = async (req, res) => {
    try {
        // The verifyToken middleware will have already validated the token
        // and attached the user to req.user
        const user = req.user;

        res.status(200).json({
            message: "Token is valid",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                avatar: user.avatar,
                lastLogin: user.lastLogin,
                registrationType: user.googleId ? 'google' : 'manual'
            }
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
}

export { registerUser, loginUser, logOut, verifyTokenRoute };