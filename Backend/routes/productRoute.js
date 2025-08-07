import express from "express";
import { getProducts, getProductById, getCategories } from "../controllers/products.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Public route - no authentication required
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.get("/categories", getCategories);

// Protected routes - authentication required
router.post("/products", verifyToken, (req, res) => {
    // Only authenticated users can create products
    res.json({
        message: "Create product endpoint",
        userId: req.userId,
        user: req.user.name
    });
});

router.put("/products/:id", verifyToken, (req, res) => {
    // Only authenticated users can update products
    res.json({
        message: `Update product ${req.params.id}`,
        userId: req.userId
    });
});

router.delete("/products/:id", verifyToken, (req, res) => {
    // Only authenticated users can delete products
    res.json({
        message: `Delete product ${req.params.id}`,
        userId: req.userId
    });
});

export default router;