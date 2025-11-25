import mongoose from "mongoose";

const tradePostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    images: {
        type: [String], // array of image URLs or base64 strings
        default: []
    },
    category: {
        type: String,
        default: "general"
    },
    tags: {
        type: [String],
        default: []
    },
    location: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes for common queries
tradePostSchema.index({ createdBy: 1 });
tradePostSchema.index({ createdAt: -1 });

const TradePost = mongoose.model("TradePost", tradePostSchema);
export default TradePost;
