const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Email templates
const emailTemplates = {
    depositPending: (user, transaction) => {
        console.log('Email template - depositPending called with transaction:', {
            paymentMethod: transaction.paymentMethod,
            methodName: transaction.methodName,
            type: transaction.type,
            amount: transaction.amount
        });

        return {
            subject: 'Deposit Request Received - Pending Approval',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .transaction-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .status-badge { display: inline-block; padding: 8px 16px; background: #fef3c7; color: #92400e; border-radius: 20px; font-weight: 600; font-size: 14px; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0;">Deposit Request Received</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>We have received your deposit request and it is currently being processed.</p>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #2563eb;">Transaction Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Amount:</span>
                                <span class="detail-value">$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Payment Method:</span>
                                <span class="detail-value">${transaction.paymentMethod || transaction.methodName || 'N/A'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Date:</span>
                                <span class="detail-value">${new Date(transaction.date).toLocaleString()}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Status:</span>
                                <span class="status-badge">Pending Approval</span>
                            </div>
                        </div>
                        
                        <p>Your deposit will be reviewed by our team and processed within 24 hours. You will receive a confirmation email once your deposit has been approved.</p>
                        
                        <p style="margin-top: 30px;">Thank you for choosing CityDay!</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `
        };
    },

    depositApproved: (user, transaction) => ({
        subject: 'Deposit Approved - Balance Updated',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .success-icon { font-size: 48px; margin-bottom: 10px; }
                    .transaction-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .status-badge { display: inline-block; padding: 8px 16px; background: #d1fae5; color: #065f46; border-radius: 20px; font-weight: 600; font-size: 14px; }
                    .balance-box { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="success-icon">✓</div>
                        <h1 style="margin: 0;">Deposit Approved!</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>Great news! Your deposit has been approved and your account balance has been updated.</p>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #10b981;">Transaction Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Amount Deposited:</span>
                                <span class="detail-value" style="color: #10b981; font-size: 18px;">+$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Payment Method:</span>
                                <span class="detail-value">${transaction.paymentMethod || transaction.methodName || 'N/A'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Approved Date:</span>
                                <span class="detail-value">${new Date().toLocaleString()}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Status:</span>
                                <span class="status-badge">Approved</span>
                            </div>
                        </div>
                        
                        <div class="balance-box">
                            <p style="margin: 0; font-size: 14px; opacity: 0.9;">New Account Balance</p>
                            <h2 style="margin: 10px 0; font-size: 32px;">$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                        </div>
                        
                        <p>You can now use these funds for transactions. Log in to your account to view your updated balance.</p>
                        
                        <p style="margin-top: 30px;">Thank you for banking with CityDay!</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    withdrawalPending: (user, transaction) => ({
        subject: 'Withdrawal Request Received - Pending Approval',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .transaction-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .status-badge { display: inline-block; padding: 8px 16px; background: #fef3c7; color: #92400e; border-radius: 20px; font-weight: 600; font-size: 14px; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0;">Withdrawal Request Received</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>We have received your withdrawal request and it is currently being processed.</p>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #f59e0b;">Transaction Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Amount:</span>
                                <span class="detail-value">$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Withdrawal Method:</span>
                                <span class="detail-value">${transaction.withdrawalMethod || 'Bank Transfer'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Date:</span>
                                <span class="detail-value">${new Date(transaction.date).toLocaleString()}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Status:</span>
                                <span class="status-badge">Pending Approval</span>
                            </div>
                        </div>
                        
                        <p>Your withdrawal request will be reviewed by our team and processed within 24-48 hours. You will receive a confirmation email once your withdrawal has been approved.</p>
                        
                        <p style="margin-top: 30px;">Thank you for choosing CityDay!</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    withdrawalApproved: (user, transaction) => ({
        subject: 'Withdrawal Approved - Funds Processed',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .success-icon { font-size: 48px; margin-bottom: 10px; }
                    .transaction-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .status-badge { display: inline-block; padding: 8px 16px; background: #d1fae5; color: #065f46; border-radius: 20px; font-weight: 600; font-size: 14px; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="success-icon">✓</div>
                        <h1 style="margin: 0;">Withdrawal Approved!</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>Your withdrawal request has been approved and the funds are being processed.</p>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #10b981;">Transaction Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Amount Withdrawn:</span>
                                <span class="detail-value" style="font-size: 18px;">$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Withdrawal Method:</span>
                                <span class="detail-value">${transaction.withdrawalMethod || 'Bank Transfer'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Approved Date:</span>
                                <span class="detail-value">${new Date().toLocaleString()}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Status:</span>
                                <span class="status-badge">Approved</span>
                            </div>
                        </div>
                        
                        <p>The funds should arrive in your account within 3-5 business days depending on your bank's processing time.</p>
                        
                        <p style="margin-top: 30px;">Thank you for banking with CityDay!</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    adminNotification: (type, user, transaction) => ({
        subject: `New ${type === 'deposit' ? 'Deposit' : 'Withdrawal'} Request - Action Required`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .alert-icon { font-size: 48px; margin-bottom: 10px; }
                    .transaction-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .action-button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="alert-icon">⚠️</div>
                        <h1 style="margin: 0;">New ${type === 'deposit' ? 'Deposit' : 'Withdrawal'} Request</h1>
                    </div>
                    <div class="content">
                        <p><strong>Action Required:</strong> A new ${type} request needs your review.</p>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #dc2626;">User Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">User:</span>
                                <span class="detail-value">${user.firstName || 'N/A'} (${user.email})</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">User ID:</span>
                                <span class="detail-value">${user._id}</span>
                            </div>
                        </div>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #dc2626;">Transaction Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Amount:</span>
                                <span class="detail-value" style="font-size: 18px; font-weight: 700;">$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${type === 'deposit' ? 'Payment Method' : 'Withdrawal Method'}:</span>
                                <span class="detail-value">${transaction.paymentMethod || transaction.methodName || transaction.withdrawalMethod || 'N/A'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Request Date:</span>
                                <span class="detail-value">${new Date(transaction.date).toLocaleString()}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Transaction ID:</span>
                                <span class="detail-value">${transaction._id}</span>
                            </div>
                        </div>
                        
                        <p style="text-align: center;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin" class="action-button">Review in Admin Panel</a>
                        </p>
                    </div>
                    <div class="footer">
                        <p>This is an automated notification from CityDay Admin System.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    passwordReset: (user, resetToken) => ({
        subject: 'Password Reset Request',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .reset-button { display: inline-block; padding: 14px 28px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                    .token-box { background: white; padding: 15px; border-radius: 8px; border: 2px dashed #cbd5e1; margin: 20px 0; text-align: center; font-family: monospace; font-size: 18px; color: #2563eb; }
                    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0;">Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>We received a request to reset your password. Click the button below to create a new password:</p>
                        
                        <p style="text-align: center;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}" class="reset-button">Reset Password</a>
                        </p>
                        
                        <p>Or copy and paste this link into your browser:</p>
                        <div class="token-box">
                            ${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}
                        </div>
                        
                        <div class="warning">
                            <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                        </div>
                        
                        <p style="margin-top: 30px;">If you have any questions, please contact our support team.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    depositDeclined: (user, transaction) => ({
        subject: 'Deposit Declined - Action Required',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .alert-icon { font-size: 48px; margin-bottom: 10px; }
                    .transaction-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .status-badge { display: inline-block; padding: 8px 16px; background: #fee2e2; color: #991b1b; border-radius: 20px; font-weight: 600; font-size: 14px; }
                    .reason-box { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="alert-icon">✕</div>
                        <h1 style="margin: 0;">Deposit Declined</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>We regret to inform you that your deposit request has been declined.</p>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #dc2626;">Transaction Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Amount:</span>
                                <span class="detail-value">$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Payment Method:</span>
                                <span class="detail-value">${transaction.paymentMethod || transaction.methodName || 'N/A'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Request Date:</span>
                                <span class="detail-value">${new Date(transaction.date).toLocaleString()}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Status:</span>
                                <span class="status-badge">Declined</span>
                            </div>
                        </div>
                        
                        ${transaction.declineReason ? `
                        <div class="reason-box">
                            <strong style="color: #dc2626;">Reason for Decline:</strong>
                            <p style="margin: 10px 0 0 0;">${transaction.declineReason}</p>
                        </div>
                        ` : ''}
                        
                        <p>If you believe this was a mistake or need further assistance, please contact our support team.</p>
                        
                        <p style="margin-top: 30px;">Thank you for your understanding.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    withdrawalDeclined: (user, transaction) => ({
        subject: 'Withdrawal Declined - Action Required',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .alert-icon { font-size: 48px; margin-bottom: 10px; }
                    .transaction-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .status-badge { display: inline-block; padding: 8px 16px; background: #fee2e2; color: #991b1b; border-radius: 20px; font-weight: 600; font-size: 14px; }
                    .reason-box { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
                    .balance-box { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="alert-icon">✕</div>
                        <h1 style="margin: 0;">Withdrawal Declined</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>We regret to inform you that your withdrawal request has been declined.</p>
                        
                        <div class="transaction-details">
                            <h3 style="margin-top: 0; color: #dc2626;">Transaction Details</h3>
                            <div class="detail-row">
                                <span class="detail-label">Amount:</span>
                                <span class="detail-value">$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Withdrawal Method:</span>
                                <span class="detail-value">${transaction.withdrawalMethod || 'Bank Transfer'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Request Date:</span>
                                <span class="detail-value">${new Date(transaction.date).toLocaleString()}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Status:</span>
                                <span class="status-badge">Declined</span>
                            </div>
                        </div>
                        
                        ${transaction.declineReason ? `
                        <div class="reason-box">
                            <strong style="color: #dc2626;">Reason for Decline:</strong>
                            <p style="margin: 10px 0 0 0;">${transaction.declineReason}</p>
                        </div>
                        ` : ''}
                        
                        <div class="balance-box">
                            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Current Account Balance</p>
                            <h2 style="margin: 10px 0; font-size: 32px;">$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                        </div>
                        
                        <p>If you believe this was a mistake or need further assistance, please contact our support team.</p>
                        
                        <p style="margin-top: 30px;">Thank you for your understanding.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    passwordReset: (user, resetToken) => ({
        subject: 'Password Reset Request',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .reset-button { display: inline-block; padding: 14px 28px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                    .token-box { background: white; padding: 15px; border-radius: 8px; border: 2px dashed #cbd5e1; margin: 20px 0; text-align: center; font-family: monospace; font-size: 18px; color: #2563eb; }
                    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0;">Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName || user.email}</strong>,</p>
                        <p>We received a request to reset your password. Click the button below to create a new password:</p>
                        
                        <p style="text-align: center;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}" class="reset-button">Reset Password</a>
                        </p>
                        
                        <p>Or copy and paste this link into your browser:</p>
                        <div class="token-box">
                            ${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}
                        </div>
                        
                        <div class="warning">
                            <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                        </div>
                        
                        <p style="margin-top: 30px;">If you have any questions, please contact our support team.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    }),

    welcome: (user) => ({
        subject: 'Welcome to CityDay - Your Account is Ready!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .welcome-icon { font-size: 48px; margin-bottom: 10px; }
                    .account-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
                    .detail-label { font-weight: 600; color: #6b7280; }
                    .detail-value { color: #111827; font-weight: 500; }
                    .account-number { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
                    .feature-box { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 3px solid #10b981; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="welcome-icon">🎉</div>
                        <h1 style="margin: 0;">Welcome to CityDay!</h1>
                    </div>
                    <div class="content">
                        <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
                        <p>Congratulations! Your account has been successfully created. We're thrilled to have you as part of the CityDay family.</p>
                        
                        <div class="account-number">
                            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your Account Number</p>
                            <h2 style="margin: 10px 0; font-size: 28px; font-family: monospace; letter-spacing: 2px;">${user.accountNumber}</h2>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8;">Please keep this number safe for future reference</p>
                        </div>
                        
                        <div class="account-details">
                            <h3 style="margin-top: 0; color: #2563eb;">Account Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Full Name:</span>
                                <span class="detail-value">${user.firstName} ${user.lastName}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Email:</span>
                                <span class="detail-value">${user.email}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Phone:</span>
                                <span class="detail-value">${user.phone}</span>
                            </div>
                            <div class="detail-row" style="border-bottom: none;">
                                <span class="detail-label">Member Since:</span>
                                <span class="detail-value">${new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                        
                        <h3 style="color: #2563eb; margin-top: 30px;">What's Next?</h3>
                        
                        <div class="feature-box">
                            <strong style="color: #10b981;">💰 Make Your First Deposit</strong>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #6b7280;">Fund your account to start managing your finances.</p>
                        </div>
                        
                        <div class="feature-box">
                            <strong style="color: #10b981;">📊 Explore Your Dashboard</strong>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #6b7280;">View your balance, transactions, and account activity.</p>
                        </div>
                        
                        <div class="feature-box">
                            <strong style="color: #10b981;">🔒 Secure Your Account</strong>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #6b7280;">We use OTP verification to keep your account safe.</p>
                        </div>
                        
                        <p style="margin-top: 30px;">If you have any questions or need assistance, our support team is here to help.</p>
                        
                        <p style="margin-top: 30px;">Welcome aboard!</p>
                        <p style="margin: 5px 0;"><strong>The CityDay Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    })
};

// Send email function
const sendEmail = async (to, template) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Email credentials not configured. Email would be sent to:', to);
            console.log('Subject:', template.subject);
            return { success: true, message: 'Email service not configured (development mode)' };
        }

        const transporter = createTransporter();

        const mailOptions = {
            from: `${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to,
            subject: template.subject,
            html: template.html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Export functions
module.exports = {
    sendDepositPendingEmail: (user, transaction) =>
        sendEmail(user.email, emailTemplates.depositPending(user, transaction)),

    sendDepositApprovedEmail: (user, transaction) =>
        sendEmail(user.email, emailTemplates.depositApproved(user, transaction)),

    sendDepositDeclinedEmail: (user, transaction) =>
        sendEmail(user.email, emailTemplates.depositDeclined(user, transaction)),

    sendWithdrawalPendingEmail: (user, transaction) =>
        sendEmail(user.email, emailTemplates.withdrawalPending(user, transaction)),

    sendWithdrawalApprovedEmail: (user, transaction) =>
        sendEmail(user.email, emailTemplates.withdrawalApproved(user, transaction)),

    sendWithdrawalDeclinedEmail: (user, transaction) =>
        sendEmail(user.email, emailTemplates.withdrawalDeclined(user, transaction)),

    sendAdminNotification: (type, user, transaction) =>
        sendEmail(process.env.ADMIN_EMAIL || process.env.EMAIL_USER, emailTemplates.adminNotification(type, user, transaction)),

    sendPasswordResetEmail: (user, resetToken) =>
        sendEmail(user.email, emailTemplates.passwordReset(user, resetToken)),

    sendWelcomeEmail: (user) =>
        sendEmail(user.email, emailTemplates.welcome(user)),
};
