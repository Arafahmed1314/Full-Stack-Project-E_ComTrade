import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import DbConnection from "./db/database.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

// Route modules will be dynamically imported below to surface import-time errors

dotenv.config();

const app = express();

// Basic global error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err?.stack || err);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason?.stack || reason);
    process.exit(1);
});

// CORS
app.use(cors({
    origin: process.env.CROSS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

// Parsers

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());

// Database
DbConnection();

// Health check
app.get('/', (req, res) => res.send('Backend is running'));

// Routes
// Mount routes with defensive import + mount to locate import-time errors
const tryMount = (path, router, pre) => {
    try {
        if (pre) app.use(path, pre, router);
        else app.use(path, router);
    } catch (err) {
        console.error(`Failed to mount ${path}:`, err && err.stack ? err.stack : err);
    }
};

const loadRoutes = async () => {
    const routes = [
        { path: '/api', mod: './routes/productRoute.js' },
        { path: '/api/auth', mod: './routes/authRoute.js' },
        { path: '/api/user/profile', mod: './routes/userProfile.js' },
        { path: '/api/admin', mod: './routes/adminRoute.js' },
        { path: '/api/cart', mod: './routes/cartRoute.js', pre: verifyToken },
        { path: '/api/orders', mod: './routes/orderRoute.js', pre: verifyToken },
        { path: '/api/wishlist', mod: './routes/wishlistRoute.js', pre: verifyToken },
        { path: '/api/reviews', mod: './routes/reviewRoute.js' },
        { path: '/api/trade', mod: './routes/tradeRoute.js' },
        { path: '/api/trade/requests', mod: './routes/tradeRequestRoute.js' }
    ];

    for (const r of routes) {
        try {
            const imported = await import(r.mod);
            const router = imported.default;
            if (!router) {
                console.warn(`Module ${r.mod} did not export a default router`);
                continue;
            }
            tryMount(r.path, router, r.pre);
        } catch (err) {
            console.error(`Error importing ${r.mod}:`, err && err.stack ? err.stack : err);
        }
    }
};

// Load routes and start server after
await loadRoutes();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
