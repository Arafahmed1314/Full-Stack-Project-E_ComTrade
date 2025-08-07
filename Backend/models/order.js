import mongoose from "mongoose";

// Order Item Schema (for items in the order)
const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    images: [String]
});

// Main Order Schema
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],

    // Order totals
    totalAmount: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },

    // Shipping details
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },

    // Delivery method
    deliveryMethod: {
        type: String,
        enum: ['standard', 'express', 'pickup'],
        default: 'standard'
    },

    // Order status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
