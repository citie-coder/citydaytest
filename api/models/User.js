const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    accountNumber: { type: String, unique: true, required: true },
    isAdmin: { type: Boolean, default: false },
    balance: { type: Number, default: 0 },
    withdrawalPin: { type: String }, // Hashed 4-digit PIN for withdrawals
    otpCode: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false }, // For email verification if needed
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
