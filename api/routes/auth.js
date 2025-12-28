const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { sendWelcomeEmail } = require('../utils/emailService');

// Email Transporter (Configure with real credentials in .env)
// Email Transporter (Configure with real credentials in .env)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass Length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'Not Set');

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('SMTP Connection Error:', error);
    } else {
        console.log('SMTP Server is ready to take our messages');
    }
});

// Helper function to generate unique account number
const generateAccountNumber = async () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

    let accountNumber;
    let isUnique = false;

    while (!isUnique) {
        const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
        accountNumber = `ACC-${dateStr}-${randomNum}`;

        // Check if account number already exists
        const existing = await User.findOne({ accountNumber });
        if (!existing) {
            isUnique = true;
        }
    }

    return accountNumber;
};

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, address } = req.body;

        // Validate required fields
        if (!email || !password || !firstName || !lastName || !phone || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Generate unique account number
        const accountNumber = await generateAccountNumber();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
            accountNumber
        });
        await newUser.save();

        // Send welcome email asynchronously (non-blocking)
        sendWelcomeEmail(newUser)
            .then(() => console.log(`Welcome email sent to ${newUser.email}`))
            .catch(err => console.error('Error sending welcome email:', err));

        res.status(201).json({
            message: 'User registered successfully',
            accountNumber
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register Admin (Temporary for testing)
router.post('/register-admin', async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, address } = req.body;

        // Generate unique account number
        const accountNumber = await generateAccountNumber();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName: firstName || 'Admin',
            lastName: lastName || 'User',
            phone: phone || '0000000000',
            address: address || 'N/A',
            accountNumber,
            isAdmin: true
        });
        await newUser.save();
        res.status(201).json({
            message: 'Admin registered successfully',
            accountNumber
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login (Step 1: Verify credentials & Send OTP)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otpCode = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();

        // Send OTP Email
        if (process.env.EMAIL_USER) {
            await transporter.sendMail({
                to: email,
                subject: 'Your Login OTP',
                text: `Your OTP is ${otp}`
            });
            console.log(`OTP sent to ${email}`);
        } else {
            console.log(`[DEV MODE] OTP for ${email}: ${otp}`);
        }

        res.json({ message: 'OTP sent to email', userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify OTP (Step 2: Issue Token)
router.post('/verify-otp', async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.otpCode !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // Clear OTP
        user.otpCode = null;
        user.otpExpires = null;
        await user.save();

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                accountNumber: user.accountNumber,
                isAdmin: user.isAdmin,
                balance: user.balance
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Password Recovery Endpoints
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/emailService');

// Forgot Password - Generate reset token and send email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // Don't reveal if user exists or not for security
            return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = await bcrypt.hash(resetToken, 10);

        // Store hashed token and expiry (1 hour)
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email
        await sendPasswordResetEmail(user, resetToken);

        res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

// Reset Password - Validate token and update password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }

        // Find user with valid reset token
        const users = await User.find({
            resetPasswordExpires: { $gt: Date.now() }
        });

        let user = null;
        for (const u of users) {
            if (u.resetPasswordToken) {
                const isValid = await bcrypt.compare(token, u.resetPasswordToken);
                if (isValid) {
                    user = u;
                    break;
                }
            }
        }

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // Update password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: 'Password has been reset successfully. You can now login with your new password.' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
