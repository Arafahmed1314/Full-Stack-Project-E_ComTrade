import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false, // sometimes not given by Google
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false, // will be null for Google users
    },
    googleId: {
        type: String, // only for Google login
        required: false,
    },
    avatar: {
        type: String, // optional profile image
    },
    phone: {
        type: String, // phone number
        required: false,
    },
    address: {
        type: String, // user address
        required: false,
    },
    emailVerified: {
        type: Boolean,
        default: false, // false for manual registration, true for Google users
    },
    isActive: {
        type: Boolean,
        default: true, // allows for account deactivation
    },
    lastLogin: {
        type: Date, // track user activity
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // automatically manages createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);
export default User;
