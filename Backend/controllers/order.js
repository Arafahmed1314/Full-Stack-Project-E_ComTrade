import Order from '../models/order.js';
import Cart from '../models/cart.js';

// Place order from selected cart items
const placeOrder = async (req, res) => {
    const { selectedItems, shippingAddress, deliveryMethod } = req.body;

    // Validation
    if (!selectedItems || selectedItems.length === 0) {
        return res.status(400).json({ message: "Please select items to order" });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.phone) {
        return res.status(400).json({ message: "Please provide address and phone number" });
    }

    try {
        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id })
            .populate('items.product', 'title price images category');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Filter cart items based on selected items (by cart item IDs)
        const orderItems = [];
        let totalAmount = 0;
        let totalItems = 0;

        for (const selectedItemId of selectedItems) {
            const cartItem = cart.items.id(selectedItemId);
            if (cartItem && cartItem.product) {
                orderItems.push({
                    product: cartItem.product._id,
                    title: cartItem.product.title,
                    price: cartItem.price,
                    quantity: cartItem.quantity,
                    images: cartItem.product.images
                });
                totalAmount += cartItem.price * cartItem.quantity;
                totalItems += cartItem.quantity;
            }
        }

        if (orderItems.length === 0) {
            return res.status(400).json({ message: "No valid items found to order" });
        }

        // Create order
        const order = new Order({
            user: req.user.id,
            items: orderItems,
            totalAmount,
            totalItems,
            shippingAddress,
            deliveryMethod: deliveryMethod || 'standard'
        });

        await order.save();

        // Remove ordered items from cart
        for (const selectedItemId of selectedItems) {
            cart.items.pull(selectedItemId);
        }
        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order: {
                id: order._id,
                totalAmount: order.totalAmount,
                totalItems: order.totalItems,
                status: order.status,
                orderDate: order.createdAt
            }
        });
    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({
            message: "Error placing order"
        });
    }
};

// Get user's order history
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 }) // Latest orders first
            .select('totalAmount totalItems status createdAt');

        res.status(200).json({
            message: "Orders retrieved successfully",
            orders: orders.map(order => ({
                id: order._id,
                totalAmount: order.totalAmount,
                totalItems: order.totalItems,
                status: order.status,
                orderDate: order.createdAt
            }))
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            message: "Error retrieving orders"
        });
    }
};

// Get specific order details
const getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({
            _id: orderId,
            user: req.user.id
        }).populate('items.product', 'title category');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order details retrieved successfully",
            order
        });
    } catch (error) {
        console.error('Get order details error:', error);
        res.status(500).json({
            message: "Error retrieving order details"
        });
    }
};

// Get order summary for checkout (before placing order)
const getOrderSummary = async (req, res) => {
    const { selectedItems } = req.body;

    if (!selectedItems || selectedItems.length === 0) {
        return res.status(400).json({ message: "Please select items for order summary" });
    }

    try {
        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id })
            .populate('items.product', 'title price images category');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate summary for selected items
        const selectedCartItems = [];
        let totalAmount = 0;
        let totalItems = 0;

        for (const selectedItemId of selectedItems) {
            const cartItem = cart.items.id(selectedItemId);
            if (cartItem && cartItem.product) {
                selectedCartItems.push({
                    id: cartItem._id,
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    itemTotal: cartItem.price * cartItem.quantity
                });
                totalAmount += cartItem.price * cartItem.quantity;
                totalItems += cartItem.quantity;
            }
        }

        res.status(200).json({
            message: "Order summary calculated successfully",
            summary: {
                items: selectedCartItems,
                totalAmount,
                totalItems,
                itemCount: selectedCartItems.length
            }
        });
    } catch (error) {
        console.error('Get order summary error:', error);
        res.status(500).json({
            message: "Error calculating order summary"
        });
    }
};

export {
    placeOrder,
    getUserOrders,
    getOrderById,
    getOrderSummary
};
