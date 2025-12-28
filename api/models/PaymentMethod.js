const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({
    type: { type: String, enum: ['crypto', 'bank'], required: true },
    name: { type: String, required: true }, // e.g., "Bitcoin", "Chase Bank"
    // Flexible structure for details
    details: {
        walletAddress: String, // For crypto
        network: String,       // For crypto
        bankName: String,      // For bank
        accountNumber: String, // For bank
        routingNumber: String, // For bank
        accountName: String,   // For bank
        swiftCode: String      // For bank
    },
    isEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
