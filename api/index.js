const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const configuredOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const defaultOrigins = ['http://localhost:5173'];
const allowedOrigins = configuredOrigins.length ? configuredOrigins : defaultOrigins;

const corsOptions = {
  origin(origin, callback) {
    if (!allowedOrigins.length || !origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`Blocked CORS request from origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Bot Detection
const botDetection = require('./middleware/botDetection');
app.use(botDetection);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
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

app.get('/', (req, res) => {
  res.send('Banking Platform API is running');
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
