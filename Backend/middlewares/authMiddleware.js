import { verifyToken as verifyJWT } from "../utils/jwt.js";
import User from "../models/user.js";

// Middleware to verify JWT token from cookies or Authorization header
const verifyToken = async (req, res, next) => {
    try {
        let token;

        // First, try to get token from cookies
        if (req.cookies && req.cookies.authToken) {
            token = req.cookies.authToken;
        }
        // If not in cookies, try Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.substring(7);
        }

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify token using utility function
        const decoded = verifyJWT(token);

        // Get user from database
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        if (!user.isActive) {
            return res.status(401).json({ message: "Account is deactivated." });
        }

        // Add user info to request object
        req.user = user;
        req.userId = decoded.userId;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token." });
        }
        return res.status(500).json({ message: "Token verification failed.", error: error.message });
    }
};


export { verifyToken };
