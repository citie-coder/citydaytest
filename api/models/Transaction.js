const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
    date: { type: Date, default: Date.now },
    // Deposit specific fields
    methodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
    methodName: { type: String }, // Snapshot of method name
    paymentMethod: { type: String }, // Payment method name for emails
    depositDetails: { type: Object }, // User provided info (e.g. transaction hash)
    screenshot: { type: String }, // Base64 encoded screenshot (optional)
    // Withdrawal specific fields
    withdrawalMethod: { type: String }, // Withdrawal method name
    recipientBankDetails: {
        type: Object,
        default: null
        // Contains: bankName, accountName, accountNumber, bankBranch, routingNumber, swiftCode
    },
    declineReason: { type: String } // Admin reason for declining (optional)
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
