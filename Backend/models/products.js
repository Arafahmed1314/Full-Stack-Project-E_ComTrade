import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length > 0; // At least one image required
            },
            message: 'At least one image is required'
        }
    },
    rating: {
        rate: {
            type: Number,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }
});

const Product = mongoose.model("Product", productSchema);
export default Product;