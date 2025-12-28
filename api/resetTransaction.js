// Script to reset a specific transaction to pending status
// Run this with: node resetTransaction.js <transaction_id>

require('dotenv').config();
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
    date: { type: Date, default: Date.now },
    methodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
    methodName: { type: String },
    depositDetails: { type: Object },
    screenshot: { type: String },
    declineReason: { type: String }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

async function resetTransaction() {
    try {
        const transactionId = process.argv[2];

        if (!transactionId) {
            console.log('Usage: node resetTransaction.js <transaction_id>');
            console.log('Example: node resetTransaction.js 507f1f77bcf86cd799439011');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB\n');

        const transaction = await Transaction.findById(transactionId).populate('userId', 'email');

        if (!transaction) {
            console.log(`Transaction with ID ${transactionId} not found.`);
            process.exit(1);
        }

        console.log('=== CURRENT TRANSACTION ===');
        console.log(`ID: ${transaction._id}`);
        console.log(`Type: ${transaction.type}`);
        console.log(`User: ${transaction.userId?.email || 'Unknown'}`);
        console.log(`Amount: $${transaction.amount}`);
        console.log(`Current Status: ${transaction.status}`);
        console.log(`Date: ${transaction.date}\n`);

        if (transaction.status === 'pending') {
            console.log('Transaction is already pending. No changes needed.');
        } else {
            transaction.status = 'pending';
            transaction.declineReason = undefined;
            await transaction.save();
            console.log('✅ Transaction status reset to PENDING');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

resetTransaction();
