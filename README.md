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
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_here
```

**Example MongoDB URI Format:**
```
MONGO_URI=mongodb+srv://sarahjacobs1677_db_user:N1WbYG0qzzg381uh@cluster0.8zhstvx.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=Cluster0
```

> **Important**: Replace `your_database_name` with your actual MongoDB database name (e.g., `citibank`, `banking`, `platform`, etc.)

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

#### MongoDB Connection Timeout Error: `Operation users.findOne() buffering timed out after 10000ms`

This is a **very common issue** when deploying to Vercel with MongoDB Atlas. The error means MongoDB cannot establish a connection within 10 seconds. Here's how to fix it:

**Solution 1: Configure MongoDB Atlas Network Access (MOST COMMON FIX)**

1. Go to your [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Navigate to **Network Access** (under Security)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ **Security Note**: For production, consider restricting to Vercel's IP ranges, but `0.0.0.0/0` works for development/testing
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to propagate
7. Redeploy your Vercel application

**Solution 2: Verify Your Connection String**

1. In MongoDB Atlas, go to **Database Access** → **Database Users**
2. Ensure you have a database user created
3. Go to **Clusters** → Click **"Connect"** → **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual database user password
6. Ensure the connection string format is correct:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```
7. Update the `MONGO_URI` environment variable in Vercel with the correct connection string
8. Redeploy your application

**Solution 3: Check Connection String in Vercel**

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify `MONGO_URI` is set correctly (no extra spaces, quotes, or line breaks)
3. Ensure the connection string includes:
   - Your username and password (URL encoded if they contain special characters)
   - The correct cluster name
   - The database name
   - Connection options: `?retryWrites=true&w=majority`

**Solution 4: Add Connection Options to Connection String**

Add these options to your `MONGO_URI` to handle serverless environments better:
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&socketTimeoutMS=45000
```

**Your MongoDB URI (add database name):**
```
MONGO_URI=mongodb+srv://sarahjacobs1677_db_user:N1WbYG0qzzg381uh@cluster0.8zhstvx.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=Cluster0
```

> **Note**: Make sure to replace `your_database_name` with your actual database name. If you haven't created a database yet, MongoDB will create it automatically when you first connect, but it's better to specify it explicitly.

**Solution 5: Verify MongoDB Atlas Cluster Status**

1. Check that your MongoDB Atlas cluster is running (not paused)
2. Ensure you're using the correct cluster (if you have multiple)
3. Verify your cluster tier supports the number of connections you need

**How to Test the Fix:**

1. After making changes, wait 2-3 minutes for MongoDB Atlas changes to propagate
2. In Vercel, go to **Deployments** → Click the three dots on latest deployment → **Redeploy**
3. Check the **Function Logs** in Vercel to see if connection is successful
4. Test your API endpoints to verify the connection works

**Additional Notes:**
- Vercel serverless functions have a cold start time, which can contribute to connection delays
- MongoDB Atlas free tier has connection limits - ensure you're not exceeding them
- If using MongoDB Atlas M0 (free tier), connections may be slower during peak times

---

**Build Fails:**
- Check that all environment variables are set correctly
- Verify MongoDB connection string is valid
- Check build logs in Vercel dashboard for specific errors

**API Not Working:**
- Ensure `MONGO_URI` is correctly set in environment variables
- Verify MongoDB Atlas network access allows Vercel IPs (see MongoDB Connection Timeout section above)
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
