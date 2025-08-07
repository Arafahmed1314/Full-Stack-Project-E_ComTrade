import Wishlist from '../models/wishlist.js';
import Product from '../models/products.js';

// Add item to wishlist
const addToWishlist = async (req, res) => {
    const { productId } = req.body;

    // Validation
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create wishlist for user
        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user.id, items: [] });
        }

        // Check if item already exists in wishlist
        const existingItem = wishlist.items.find(item =>
            item.product.toString() === productId.toString()
        );

        if (existingItem) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        // Add item to wishlist
        wishlist.items.push({
            product: productId
        });

        await wishlist.save();

        res.status(200).json({
            message: "Item added to wishlist successfully",
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            },
            product: {
                id: product._id,
                title: product.title,
                price: product.price,
                images: product.images,
                category: product.category
            }
        });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({
            message: "Error adding item to wishlist"
        });
    }
};

// Get user's wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id })
            .populate('items.product', 'title price images category rating');

        if (!wishlist || wishlist.items.length === 0) {
            return res.status(200).json({
                message: "Wishlist is empty",
                items: [],
                totalItems: 0
            });
        }

        res.status(200).json({
            message: "Wishlist retrieved successfully",
            items: wishlist.items,
            totalItems: wishlist.items.length
        });
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({
            message: "Error retrieving wishlist"
        });
    }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
    const { productId } = req.params;

    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id })
            .populate('items.product', 'title price images category');

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        // Find the item in wishlist
        const itemIndex = wishlist.items.findIndex(item =>
            item.product._id.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in wishlist" });
        }

        // Get item details before removing
        const removedItem = wishlist.items[itemIndex];

        // Remove item from wishlist
        wishlist.items.splice(itemIndex, 1);
        await wishlist.save();

        res.status(200).json({
            message: "Item removed from wishlist successfully",
            removedItem: {
                productId: removedItem.product._id,
                productTitle: removedItem.product.title,
                productPrice: removedItem.product.price
            }
        });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({
            message: "Error removing item from wishlist"
        });
    }
};

// Clear entire wishlist
const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.items = [];
        await wishlist.save();

        res.status(200).json({
            message: "Wishlist cleared successfully"
        });
    } catch (error) {
        console.error('Clear wishlist error:', error);
        res.status(500).json({
            message: "Error clearing wishlist"
        });
    }
};

export {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist
};
