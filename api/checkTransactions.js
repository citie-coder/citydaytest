// Script to check and reset transaction statuses
// Run this with: node checkTransactions.js

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

async function checkTransactions() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB\n');

        // Get all transactions
        const allTransactions = await Transaction.find().populate('userId', 'email');
        console.log(`Total transactions in database: ${allTransactions.length}\n`);

        // Group by status
        const pending = allTransactions.filter(t => t.status === 'pending');
        const approved = allTransactions.filter(t => t.status === 'approved');
        const declined = allTransactions.filter(t => t.status === 'declined');

        console.log('=== TRANSACTION STATUS BREAKDOWN ===');
        console.log(`Pending: ${pending.length}`);
        console.log(`Approved: ${approved.length}`);
        console.log(`Declined: ${declined.length}\n`);

        // Show pending deposits
        const pendingDeposits = pending.filter(t => t.type === 'deposit');
        console.log('=== PENDING DEPOSITS ===');
        if (pendingDeposits.length === 0) {
            console.log('No pending deposits found.\n');
        } else {
            pendingDeposits.forEach(t => {
                console.log(`ID: ${t._id}`);
                console.log(`User: ${t.userId?.email || 'Unknown'}`);
                console.log(`Amount: $${t.amount}`);
                console.log(`Date: ${t.date}`);
                console.log(`Status: ${t.status}`);
                console.log('---');
            });
        }

        // Show pending withdrawals
        const pendingWithdrawals = pending.filter(t => t.type === 'withdrawal');
        console.log('\n=== PENDING WITHDRAWALS ===');
        if (pendingWithdrawals.length === 0) {
            console.log('No pending withdrawals found.\n');
        } else {
            pendingWithdrawals.forEach(t => {
                console.log(`ID: ${t._id}`);
                console.log(`User: ${t.userId?.email || 'Unknown'}`);
                console.log(`Amount: $${t.amount}`);
                console.log(`Date: ${t.date}`);
                console.log(`Status: ${t.status}`);
                console.log('---');
            });
        }

        // Show all transactions with their statuses
        console.log('\n=== ALL TRANSACTIONS ===');
        allTransactions.forEach(t => {
            console.log(`${t.type.toUpperCase()} | ${t.status.toUpperCase()} | $${t.amount} | ${t.userId?.email || 'Unknown'} | ${t._id}`);
        });

        console.log('\n=== ACTIONS ===');
        console.log('If you see transactions that should be pending but are not,');
        console.log('you can reset them by running: node resetTransactions.js <transaction_id>');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

checkTransactions();
