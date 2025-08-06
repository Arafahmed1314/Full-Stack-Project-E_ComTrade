import express from "express";
import cors from "cors";
import DbConnection from "./db/database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import userProfileRoute from "./routes/userProfile.js";
import cookieParser from "cookie-parser";
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
