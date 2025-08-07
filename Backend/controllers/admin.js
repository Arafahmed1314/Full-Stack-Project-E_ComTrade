import Product from "../models/products.js";

const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, imageUrl, rating } = req.body;

        // Validate required fields
        if (!title || !price || !category) {
            return res.status(400).json({ message: "Title, price, and category are required" });
        }

        // Validate price is positive
        if (Number(price) <= 0) {
            return res.status(400).json({ message: "Price must be positive" });
        }

        // Validate images
        if (!imageUrl || (Array.isArray(imageUrl) && imageUrl.length === 0)) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        // Generate better ID
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        // Create new product
        const newProduct = new Product({
            id: newId,
            title,
            description,
            price: Number(price),
            category,
            images: Array.isArray(imageUrl) ? imageUrl : [imageUrl],
            rating: rating ? {
                rate: rating.rate || 0,
                count: rating.count || 0
            } : {
                rate: 0,
                count: 0
            }
        });

        // Save product to database
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
}
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category, imageUrl, rating } = req.body;

    try {
        // Find product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                productId: id
            });
        }

        // Update fields with validation
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) {
            if (Number(price) <= 0) {
                return res.status(400).json({ message: "Price must be positive" });
            }
            product.price = Number(price);
        }
        if (category) product.category = category;
        if (imageUrl) {
            // Handle both single image and array of images
            product.images = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
        }
        if (rating) {
            product.rating = {
                rate: rating.rate || product.rating.rate,
                count: rating.count || product.rating.count
            };
        }

        // Save updated product
        await product.save();
        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
}
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Find and delete product in one operation
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                productId: id
            });
        }
        res.json({
            message: "Product deleted successfully",
            deletedProduct: {
                id: product._id,
                title: product.title
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}
// Simplified admin view - get all products without complex filtering
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });

        res.json({
            message: "Products retrieved successfully",
            totalProducts: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

export { createProduct, updateProduct, deleteProduct, getAllProducts };