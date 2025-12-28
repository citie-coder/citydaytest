const router = require('express').Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const PaymentMethod = require('../models/PaymentMethod');
const jwt = require('jsonwebtoken');
const {
    sendDepositPendingEmail,
    sendWithdrawalPendingEmail,
    sendAdminNotification
} = require('../utils/emailService');

// Middleware to verify User
const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Get Dashboard Data
router.get('/dashboard', verifyUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -otpCode -otpExpires -withdrawalPin');
        const userWithPinStatus = user.toObject();

        // Check if user has a PIN set (we need to query this separately or assume based on field existence if we selected it, but we excluded it)
        // Re-fetching just the pin field or checking existence before exclusion is better.
        // Actually, let's just fetch it to check, then remove it from the object we send.
        const userFull = await User.findById(req.user.id).select('withdrawalPin');
        userWithPinStatus.hasWithdrawalPin = !!userFull.withdrawalPin;

        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
        res.json({ user: userWithPinStatus, transactions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update User Profile
router.put('/profile', verifyUser, async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update fields
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        await user.save();

        const updatedUser = await User.findById(req.user.id).select('-password -otpCode -otpExpires -withdrawalPin');
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Set/Update Withdrawal PIN
router.post('/set-withdrawal-pin', verifyUser, async (req, res) => {
    try {
        const { pin, currentPin } = req.body;
        const bcrypt = require('bcryptjs');

        // Validate PIN format (4 digits)
        if (!/^\d{4}$/.test(pin)) {
            return res.status(400).json({ error: 'PIN must be exactly 4 digits' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // If user already has a PIN, verify current PIN
        if (user.withdrawalPin) {
            if (!currentPin) {
                return res.status(400).json({ error: 'Current PIN required to change PIN' });
            }
            const isMatch = await bcrypt.compare(currentPin, user.withdrawalPin);
            if (!isMatch) {
                return res.status(400).json({ error: 'Current PIN is incorrect' });
            }
        }

        // Hash and save new PIN
        user.withdrawalPin = await bcrypt.hash(pin, 10);
        await user.save();

        res.json({ message: user.withdrawalPin ? 'Withdrawal PIN updated successfully' : 'Withdrawal PIN set successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Request Withdrawal
router.post('/withdraw', verifyUser, async (req, res) => {
    try {
        const { amount, pin, recipientBankDetails } = req.body;
        const bcrypt = require('bcryptjs');
        const user = await User.findById(req.user.id);

        // Validate inputs
        if (!amount || !recipientBankDetails) {
            return res.status(400).json({ error: 'Amount and recipient bank details are required' });
        }

        // Validate required bank details
        const { bankName, accountName, accountNumber } = recipientBankDetails;
        if (!bankName || !accountName || !accountNumber) {
            return res.status(400).json({ error: 'Bank name, account name, and account number are required' });
        }

        if (user.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Verify withdrawal PIN
        if (!user.withdrawalPin) {
            return res.status(400).json({ error: 'Please set a withdrawal PIN first' });
        }

        if (!pin) {
            return res.status(400).json({ error: 'Withdrawal PIN required' });
        }

        const isPinValid = await bcrypt.compare(pin, user.withdrawalPin);
        if (!isPinValid) {
            return res.status(400).json({ error: 'Invalid withdrawal PIN' });
        }

        // Balance will be deducted upon admin approval

        const newTransaction = new Transaction({
            userId: req.user.id,
            type: 'withdrawal',
            amount,
            recipientBankDetails,
            status: 'pending'
        });
        await newTransaction.save();

        // Send email notifications asynchronously (non-blocking)
        sendWithdrawalPendingEmail(user, newTransaction)
            .then(() => console.log(`Withdrawal pending email sent to ${user.email}`))
            .catch(err => console.error('Error sending withdrawal pending email:', err));

        sendAdminNotification('withdrawal', user, newTransaction)
            .then(() => console.log(`Admin notification sent for withdrawal from ${user.email}`))
            .catch(err => console.error('Error sending admin notification:', err));

        res.json({ message: 'Withdrawal requested', balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Deposit Features ---

// Get Enabled Payment Methods
router.get('/payment-methods', verifyUser, async (req, res) => {
    try {
        const methods = await PaymentMethod.find({ isEnabled: true }).sort({ name: 1 });
        res.json(methods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Initiate Deposit
router.post('/deposit', verifyUser, async (req, res) => {
    try {
        const { amount, methodId, depositDetails, screenshot } = req.body;

        // Validate amount
        const depositAmount = Number(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            return res.status(400).json({ error: 'Invalid deposit amount' });
        }

        const method = await PaymentMethod.findById(methodId);
        if (!method) return res.status(404).json({ error: 'Payment method not found' });

        console.log('Payment method found:', { id: method._id, name: method.name, type: method.type });

        const newTransaction = new Transaction({
            userId: req.user.id,
            type: 'deposit',
            amount: depositAmount,
            status: 'pending',
            methodId,
            methodName: method.name,
            depositDetails,
            paymentMethod: method.name || method.type || 'Unknown',
            screenshot: screenshot || null // Optional screenshot
        });

        console.log('Transaction before save:', {
            paymentMethod: newTransaction.paymentMethod,
            methodName: newTransaction.methodName
        });

        await newTransaction.save();

        // Get user details for email
        const user = await User.findById(req.user.id).select('-password -otpCode -otpExpires');

        // Send email notifications asynchronously (non-blocking)
        sendDepositPendingEmail(user, newTransaction)
            .then(() => console.log(`Deposit pending email sent to ${user.email}`))
            .catch(err => console.error('Error sending deposit pending email:', err));

        sendAdminNotification('deposit', user, newTransaction)
            .then(() => console.log(`Admin notification sent for deposit from ${user.email}`))
            .catch(err => console.error('Error sending admin notification:', err));

        res.json({ message: 'Deposit initiated', transaction: newTransaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
