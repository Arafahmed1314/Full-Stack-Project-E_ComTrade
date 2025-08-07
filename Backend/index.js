import express from "express";
import cors from "cors";
import DbConnection from "./db/database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import userProfileRoute from "./routes/userProfile.js";
import adminRoute from "./routes/adminRoute.js"; // Assuming you have an admin controller
import cartRoute from "./routes/cartRoute.js"; // Assuming you have a cart route
import orderRoute from "./routes/orderRoute.js";
import wishlistRoute from "./routes/wishlistRoute.js"; // Assuming you have a wishlist route
import reviewRoute from "./routes/reviewRoute.js"; // Assuming you have a review route
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/authMiddleware.js";

const app = express();
dotenv.config();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
DbConnection();
app.get("/", (req, res) => {
    res.send("Backend is running!");
});
app.use("/api", productRoute);
app.use('/api/auth', authRoute);
app.use('/api/user/profile', userProfileRoute);
app.use('/api/admin', adminRoute);
app.use('/api/cart', verifyToken, cartRoute);
app.use('/api/orders', verifyToken, orderRoute);
app.use('/api/wishlist', verifyToken, wishlistRoute);
app.use('/api/reviews', verifyToken, reviewRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
