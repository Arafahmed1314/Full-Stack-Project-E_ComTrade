import Cart from '../models/cart.js';
import Product from '../models/products.js';

// Add item to cart
const addToCart = async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    // Validation
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    if (quantity < 1 || quantity > 99) {
        return res.status(400).json({ message: "Quantity must be between 1 and 99" });
    }

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create cart for user
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        // Migrate old cart items if they don't have price field
        for (let item of cart.items) {
            if (!item.price && item.priceAtAdd) {
                item.price = item.priceAtAdd;
            } else if (!item.price) {
                // If no price at all, fetch current product price
                const itemProduct = await Product.findById(item.product);
                if (itemProduct) {
                    item.price = itemProduct.price;
                }
            }
        }

        // Check if item already exists in cart
        const existingItem = cart.items.find(item =>
            item.product.toString() === productId.toString()
        );

        if (existingItem) {
            existingItem.quantity += quantity;
            if (existingItem.quantity > 99) {
                existingItem.quantity = 99;
            }
            // Ensure existing item has price
            if (!existingItem.price) {
                existingItem.price = product.price;
            }
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Item added to cart successfully",
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
            },
            addedQuantity: quantity
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            message: "Error adding item to cart"
        });
    }
};

// Get user's cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate('items.product', 'title price images category');

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                message: "Cart is empty",
                items: [],
                totalItems: 0,
                totalPrice: 0
            });
        }

        // Migrate old cart items if they don't have price field
        let needsSave = false;
        for (let item of cart.items) {
            if (!item.price && item.priceAtAdd) {
                item.price = item.priceAtAdd;
                needsSave = true;
            } else if (!item.price && item.product && item.product.price) {
                item.price = item.product.price;
                needsSave = true;
            }
        }

        // Save cart if we made migrations
        if (needsSave) {
            await cart.save();
        }

        // Calculate totals
        const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        res.status(200).json({
            message: "Cart retrieved successfully",
            items: cart.items,
            totalItems,
            totalPrice
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            message: "Error retrieving cart"
        });
    }
};

// Update item quantity in cart
const updateCartItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 0 || quantity > 99) {
        return res.status(400).json({
            message: "Valid quantity (0-99) is required"
        });
    }

    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        if (quantity === 0) {
            cart.items.pull(itemId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();

        res.status(200).json({
            message: quantity === 0 ? "Item removed from cart" : "Item quantity updated"
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({
            message: "Error updating cart item"
        });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    const { itemId } = req.params; // This can be either cart item ID or product ID

    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate('items.product', 'title price images category');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        let removedItem = null;
        let isProductId = false;

        // First try to find by cart item ID
        const itemById = cart.items.id(itemId);
        if (itemById) {
            removedItem = itemById;
            cart.items.pull(itemId);
        } else {
            // If not found, try to find by product ID
            const itemByProductId = cart.items.find(item =>
                item.product._id.toString() === itemId.toString()
            );
            if (itemByProductId) {
                removedItem = itemByProductId;
                cart.items.pull(itemByProductId._id);
                isProductId = true;
            }
        }

        if (!removedItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        await cart.save();

        res.status(200).json({
            message: "Item removed from cart successfully",
            removedItem: {
                productId: removedItem.product._id,
                productTitle: removedItem.product.title,
                quantity: removedItem.quantity,
                price: removedItem.price
            },
            detectedAs: isProductId ? "product ID" : "cart item ID"
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            message: "Error removing item from cart"
        });
    }
};

// Clear entire cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            message: "Cart cleared successfully"
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            message: "Error clearing cart"
        });
    }
};

// Get cart summary (for cart icon)
const getCartSummary = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate('items.product', 'price');

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                totalItems: 0,
                totalPrice: 0
            });
        }

        // Migrate old cart items if they don't have price field
        let needsSave = false;
        for (let item of cart.items) {
            if (!item.price && item.priceAtAdd) {
                item.price = item.priceAtAdd;
                needsSave = true;
            } else if (!item.price && item.product && item.product.price) {
                item.price = item.product.price;
                needsSave = true;
            }
        }

        // Save cart if we made migrations
        if (needsSave) {
            await cart.save();
        }

        const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        res.status(200).json({
            totalItems,
            totalPrice
        });
    } catch (error) {
        console.error('Get cart summary error:', error);
        res.status(500).json({
            message: "Error getting cart summary"
        });
    }
};

export {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartSummary
};
