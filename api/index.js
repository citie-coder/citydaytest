const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
// CORS configuration - allow requests from Vercel deployment and localhost
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow Vercel deployments (any vercel.app domain)
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Allow custom domains (you can add your custom domain here)
    // if (origin.includes('yourdomain.com')) {
    //   return callback(null, true);
    // }
    
    callback(null, true); // Allow all origins for now - adjust as needed
  },
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Bot Detection
const botDetection = require('./middleware/botDetection');
app.use(botDetection);

// Database Connection
// Optimized for serverless environments (Vercel)
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
  .then(async () => {
    console.log('MongoDB Connected');

    // Seed Admin User
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');

      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      try {
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
          const hashedPassword = await bcrypt.hash(adminPassword, 10);

          // Generate account number for admin
          const date = new Date();
          const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
          const randomNum = Math.floor(100000 + Math.random() * 900000);
          const accountNumber = `ACC-${dateStr}-${randomNum}`;

          const newAdmin = new User({
            email: adminEmail,
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            phone: '0000000000',
            address: 'Admin Office',
            accountNumber,
            isAdmin: true,
            balance: 1000000 // Initial balance for admin
          });
          await newAdmin.save();
          console.log(`Admin user created: ${adminEmail}`);
        } else {
          // Optional: Update password or ensure isAdmin is true
          if (!existingAdmin.isAdmin) {
            existingAdmin.isAdmin = true;
            await existingAdmin.save();
            console.log(`User ${adminEmail} promoted to Admin`);
          }
          console.log(`Admin user already exists: ${adminEmail}`);
        }
      } catch (err) {
        console.error('Error seeding admin user:', err);
      }
    }
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Health check endpoints
app.get('/', (req, res) => {
  res.send('Banking Platform API is running');
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Banking Platform API is running',
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint to verify API is accessible
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API test endpoint working',
    status: 'ok',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    url: req.url
  });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
