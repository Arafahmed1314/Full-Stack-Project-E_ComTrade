import jwt from "jsonwebtoken";

// JWT utility functions
const JWT_SECRET = process.env.JWT_SECRET || 'araf1314';
const JWT_EXPIRES_IN = '7d';

// Generate JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

// Generate token with user data
const generateAuthToken = (user) => {
    return generateToken({
        userId: user._id,
        email: user.email,
        registrationType: user.googleId ? 'google' : 'manual'
    });
};

// Cookie options for secure token storage
const getCookieOptions = () => {
    return {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        path: '/' // Available on all routes
    };
};

export {
    generateToken,
    verifyToken,
    generateAuthToken,
    getCookieOptions,
    JWT_SECRET,
    JWT_EXPIRES_IN
};
