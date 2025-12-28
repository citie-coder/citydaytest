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

## Deployment on Vercel

This project is configured for Vercel monorepo deployment. Follow these steps to deploy your banking platform live on Vercel:

### Prerequisites
- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your MongoDB Atlas connection string
- Email credentials (optional, for OTP functionality)

### Step-by-Step Deployment Guide

#### 1. Push Your Code to GitHub
First, ensure your project is pushed to a GitHub repository:
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

#### 2. Import Project to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will automatically detect your project structure

#### 3. Configure Project Settings
In the Vercel project configuration:
- **Framework Preset**: Select "Other" or "Vite" (Vercel will auto-detect)
- **Root Directory**: Set to `.` (the root of your repository)
- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install && cd client && npm install && cd ../api && npm install`

#### 4. Configure Environment Variables
In Vercel project settings, go to **Settings** → **Environment Variables** and add the following:

**Required Variables:**
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key_here
```

**Optional Variables (for email functionality):**
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

**Admin Configuration:**
```
ADMIN_EMAIL=admin@citi.com
ADMIN_PASSWORD=your_secure_admin_password
PORT=5000
```

> **Important**: 
> - Replace all placeholder values with your actual credentials
> - For MongoDB Atlas, ensure your IP whitelist includes Vercel's IP ranges (or use `0.0.0.0/0` for development)
> - The `JWT_SECRET` should be a long, random string for security
> - If you don't provide email credentials, OTP codes will be logged to the backend console

#### 5. Deploy
1. Click **"Deploy"** button
2. Vercel will automatically:
   - Install dependencies
   - Build your frontend
   - Deploy both frontend and API routes
3. Wait for the deployment to complete (usually 2-3 minutes)

#### 6. Verify Deployment
After deployment:
1. Your platform will be live at `https://your-project-name.vercel.app`
2. The API will be available at `https://your-project-name.vercel.app/api/*`
3. Test the application:
   - Register a new user
   - Login with admin credentials (if configured)
   - Verify all features are working

### How It Works on Vercel

The `vercel.json` configuration file handles routing:
- **API Routes**: All requests to `/api/*` are routed to `/api/index.js` (your Express serverless function)
- **Frontend Routes**: All other requests are routed to `/index.html` (your React app handles client-side routing)

### Troubleshooting

**Build Fails:**
- Check that all environment variables are set correctly
- Verify MongoDB connection string is valid
- Check build logs in Vercel dashboard for specific errors

**API Not Working:**
- Ensure `MONGO_URI` is correctly set in environment variables
- Verify MongoDB Atlas network access allows Vercel IPs
- Check function logs in Vercel dashboard

**Frontend Not Loading:**
- Verify build command completed successfully
- Check that `client/dist` directory exists after build
- Ensure output directory is set to `client/dist`

### Updating Your Deployment
After making changes:
1. Push changes to your GitHub repository
2. Vercel will automatically trigger a new deployment
3. You can also manually redeploy from the Vercel dashboard

### Custom Domain (Optional)
1. Go to **Settings** → **Domains** in your Vercel project
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## Admin Access
To create an admin user:
1. Register a new user via the frontend.
2. Manually update the user document in MongoDB: set `isAdmin: true`.
3. Login again to access the Admin Dashboard.
