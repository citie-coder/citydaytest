# Citi Banking Platform Clone

A full-stack banking application inspired by Citibank, built with Vite React, Node.js, Express, and MongoDB.

## Features
- **Authentication**: Email & Password + OTP (One-Time Password) verification.
- **User Dashboard**: View balance, transaction history, and request withdrawals.
- **Admin Dashboard**: Manage users, approve/decline withdrawals, and add funds.
- **Responsive Design**: Modern UI with Citibank branding.

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (Connection String)

## Setup Instructions

### 1. Install Dependencies
Run the following commands from the root directory:
```bash
# Install root dependencies (if any)
npm install

# Install Backend dependencies
cd api
npm install

# Install Frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `api` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
ADMIN_EMAIL=admin@citi.com
ADMIN_PASSWORD=admin123
PORT=5000
```
> **Note**: If you don't provide email credentials, the OTP will be logged to the backend console.
> **Note**: The system will automatically create an Admin user with the provided `ADMIN_EMAIL` and `ADMIN_PASSWORD` on startup if one doesn't exist.

### 3. Run the Application
You need to run both the backend and frontend servers.

**Terminal 1 (Backend):**
```bash
cd api
npm start
```
Server will run on `http://localhost:5000`.

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`.

## Deployment (Vercel)
This project is configured for Vercel monorepo deployment.
1. Push to GitHub.
2. Import project in Vercel.
3. Set Root Directory to `.` (root).
4. Add Environment Variables in Vercel Settings.
5. Deploy!

## Admin Access
To create an admin user:
1. Register a new user via the frontend.
2. Manually update the user document in MongoDB: set `isAdmin: true`.
3. Login again to access the Admin Dashboard.
