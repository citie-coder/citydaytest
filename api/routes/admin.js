const router = require('express').Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const PaymentMethod = require('../models/PaymentMethod');
const jwt = require('jsonwebtoken');
const {
    sendDepositApprovedEmail,
    sendDepositDeclinedEmail,
    sendWithdrawalApprovedEmail,
    sendWithdrawalDeclinedEmail
} = require('../utils/emailService');

// Middleware to check Admin
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified.isAdmin) return res.status(403).json({ error: 'Admin access required' });
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Get all users
router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Balance
router.post('/add-balance', verifyAdmin, async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.balance += Number(amount);
        await user.save();

        // Log transaction
        const newTransaction = new Transaction({
            userId,
            type: 'deposit',
            amount,
            status: 'approved',
            paymentMethod: 'Manual Admin Addition'
        });
        await newTransaction.save();

        res.json({ message: 'Balance added successfully', balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update User Details (Admin)
router.put('/users/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, address, balance, password } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update only allowed fields
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;
        if (balance !== undefined) user.balance = Number(balance);

        // Hash password if provided
        if (password && password.trim() !== '') {
            const bcrypt = require('bcryptjs');
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        // Return updated user without password
        const updatedUser = await User.findById(id).select('-password');
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get Pending Withdrawals
router.get('/withdrawals', verifyAdmin, async (req, res) => {
    try {
        const withdrawals = await Transaction.find({ type: 'withdrawal' })
            .populate('userId', 'email')
            .sort({ date: -1 });
        res.json(withdrawals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Approve/Decline Withdrawal
router.post('/withdrawal-action', verifyAdmin, async (req, res) => {
    try {
        const { transactionId, action, declineReason } = req.body; // action: 'approve' or 'decline'
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        if (transaction.type !== 'withdrawal') return res.status(400).json({ error: 'Not a withdrawal transaction' });

        if (transaction.status !== 'pending') {
            return res.status(400).json({
                error: `Transaction already ${transaction.status}. Current status: ${transaction.status}`
            });
        }

        let user = await User.findById(transaction.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (action === 'approve') {
            if (user.balance < transaction.amount) {
                return res.status(400).json({ error: 'User has insufficient balance for this withdrawal' });
            }
            transaction.status = 'approved';
            user.balance -= transaction.amount;
            await user.save();
            console.log(`Withdrawal approved: User ${user.email}, Amount: $${transaction.amount}, New Balance: $${user.balance}`);
        } else if (action === 'decline') {
            transaction.status = 'declined';
            if (declineReason) {
                transaction.declineReason = declineReason;
            }
            // No refund needed as balance wasn't deducted
            console.log(`Withdrawal declined: User ${user.email}, Reason: ${declineReason || 'None provided'}`);
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        await transaction.save();

        // Send email notification to user with updated balance
        const userForEmail = await User.findById(transaction.userId).select('-password -otpCode -otpExpires');
        if (action === 'approve') {
            sendWithdrawalApprovedEmail(userForEmail, transaction).catch(err => console.error('Email error:', err));
            console.log(`Withdrawal approval email initiated for ${userForEmail.email}`);
        } else if (action === 'decline') {
            sendWithdrawalDeclinedEmail(userForEmail, transaction).catch(err => console.error('Email error:', err));
            console.log(`Withdrawal decline email initiated for ${userForEmail.email}`);
        }

        res.json({
            message: `Withdrawal ${action}d successfully`,
            transaction,
            currentBalance: userForEmail.balance
        });
    } catch (err) {
        console.error('Withdrawal action error:', err);
        res.status(500).json({ error: err.message });
    }
});

// --- Payment Methods Management ---

// Add Payment Method
router.post('/payment-methods', verifyAdmin, async (req, res) => {
    try {
        const { type, name, details } = req.body;
        const newMethod = new PaymentMethod({ type, name, details });
        await newMethod.save();
        res.json(newMethod);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Payment Methods (Admin sees all)
router.get('/payment-methods', verifyAdmin, async (req, res) => {
    try {
        const methods = await PaymentMethod.find().sort({ createdAt: -1 });
        res.json(methods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete/Disable Payment Method
router.delete('/payment-methods/:id', verifyAdmin, async (req, res) => {
    try {
        await PaymentMethod.findByIdAndDelete(req.params.id);
        res.json({ message: 'Payment method deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Deposit Management ---

// Get Pending Deposits
router.get('/deposits', verifyAdmin, async (req, res) => {
    try {
        const deposits = await Transaction.find({ type: 'deposit' })
            .populate('userId', 'email')
            .populate('methodId', 'name type')
            .sort({ date: -1 });
        res.json(deposits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Approve/Decline Deposit
router.put('/deposits/:id/:action', verifyAdmin, async (req, res) => {
    try {
        const { id, action } = req.params; // action: 'approve' or 'decline'
        const { declineReason } = req.body;
        const transaction = await Transaction.findById(id);

        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        if (transaction.type !== 'deposit') return res.status(400).json({ error: 'Not a deposit transaction' });

        if (transaction.status !== 'pending') {
            return res.status(400).json({
                error: `Transaction already ${transaction.status}. Current status: ${transaction.status}`
            });
        }

        let user = await User.findById(transaction.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (action === 'approve') {
            transaction.status = 'approved';
            // Add balance to user
            user.balance += transaction.amount;
            await user.save();
            console.log(`Deposit approved: User ${user.email} balance updated to $${user.balance}`);
        } else if (action === 'decline') {
            transaction.status = 'declined';
            if (declineReason) {
                transaction.declineReason = declineReason;
            }
            console.log(`Deposit declined: User ${user.email}, Reason: ${declineReason || 'None provided'}`);
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        await transaction.save();

        // Send email notification to user with updated balance
        const userForEmail = await User.findById(transaction.userId).select('-password -otpCode -otpExpires');
        if (action === 'approve') {
            sendDepositApprovedEmail(userForEmail, transaction).catch(err => console.error('Email error:', err));
            console.log(`Deposit approval email initiated for ${userForEmail.email}`);
        } else if (action === 'decline') {
            sendDepositDeclinedEmail(userForEmail, transaction).catch(err => console.error('Email error:', err));
            console.log(`Deposit decline email initiated for ${userForEmail.email}`);
        }

        res.json({
            message: `Deposit ${action}d successfully`,
            transaction,
            newBalance: action === 'approve' ? userForEmail.balance : undefined
        });
    } catch (err) {
        console.error('Deposit action error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update Transaction Details (Admin) - with automatic balance adjustment
router.put('/transactions/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, status, date, type, methodName, paymentMethod } = req.body;

        const transaction = await Transaction.findById(id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

        const user = await User.findById(transaction.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Store old values for balance calculation
        const oldAmount = transaction.amount;
        const oldStatus = transaction.status;
        const newAmount = amount !== undefined ? Number(amount) : oldAmount;
        const newStatus = status !== undefined ? status : oldStatus;

        // Calculate balance adjustment
        let balanceAdjustment = 0;

        // Logic for balance adjustment based on transaction type and status changes
        if (transaction.type === 'deposit') {
            // If deposit was approved, we need to reverse it first
            if (oldStatus === 'approved') {
                balanceAdjustment -= oldAmount; // Remove old approved amount
            }
            // If new status is approved, add the new amount
            if (newStatus === 'approved') {
                balanceAdjustment += newAmount; // Add new approved amount
            }
        } else if (transaction.type === 'withdrawal') {
            // If withdrawal was approved, we need to reverse it first
            if (oldStatus === 'approved') {
                balanceAdjustment += oldAmount; // Restore old withdrawn amount
            }
            // If new status is approved, deduct the new amount
            if (newStatus === 'approved') {
                balanceAdjustment -= newAmount; // Deduct new approved amount
            }
        }

        // Apply balance adjustment
        if (balanceAdjustment !== 0) {
            const newBalance = user.balance + balanceAdjustment;
            
            // Validate balance doesn't go negative
            if (newBalance < 0) {
                return res.status(400).json({ 
                    error: 'Cannot update transaction: would result in negative balance',
                    currentBalance: user.balance,
                    adjustment: balanceAdjustment
                });
            }
            
            // Update only the balance field to avoid validation issues
            await User.findByIdAndUpdate(transaction.userId, { balance: newBalance });
            user.balance = newBalance; // Update local object for response
            console.log(`Balance adjusted for user ${user.email}: ${balanceAdjustment > 0 ? '+' : ''}${balanceAdjustment.toFixed(2)}, New balance: ${user.balance.toFixed(2)}`);
        }

        // Update transaction fields
        if (amount !== undefined) transaction.amount = newAmount;
        if (status !== undefined) transaction.status = newStatus;
        if (date !== undefined) transaction.date = new Date(date);
        if (type !== undefined) transaction.type = type;
        if (methodName !== undefined) transaction.methodName = methodName;
        if (paymentMethod !== undefined) transaction.paymentMethod = paymentMethod;

        await transaction.save();

        res.json({ 
            message: 'Transaction updated successfully', 
            transaction,
            balanceAdjustment,
            newUserBalance: user.balance
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Transaction (Admin) - with automatic balance adjustment
router.delete('/transactions/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findById(id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

        const user = await User.findById(transaction.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Calculate balance adjustment when deleting
        let balanceAdjustment = 0;

        // Only adjust balance if the transaction was approved
        if (transaction.status === 'approved') {
            if (transaction.type === 'deposit') {
                // Reverse the deposit - subtract from balance
                balanceAdjustment -= transaction.amount;
            } else if (transaction.type === 'withdrawal') {
                // Reverse the withdrawal - add back to balance
                balanceAdjustment += transaction.amount;
            }
        }

        // Apply balance adjustment
        if (balanceAdjustment !== 0) {
            const newBalance = user.balance + balanceAdjustment;
            
            // Validate balance doesn't go negative
            if (newBalance < 0) {
                return res.status(400).json({ 
                    error: 'Cannot delete transaction: would result in negative balance',
                    currentBalance: user.balance,
                    adjustment: balanceAdjustment
                });
            }
            
            // Update only the balance field to avoid validation issues
            await User.findByIdAndUpdate(transaction.userId, { balance: newBalance });
            user.balance = newBalance; // Update local object for response
            console.log(`Balance adjusted after deletion for user ${user.email}: ${balanceAdjustment > 0 ? '+' : ''}${balanceAdjustment.toFixed(2)}, New balance: ${user.balance.toFixed(2)}`);
        }

        await Transaction.findByIdAndDelete(id);

        res.json({ 
            message: 'Transaction deleted successfully',
            balanceAdjustment,
            newUserBalance: user.balance
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
