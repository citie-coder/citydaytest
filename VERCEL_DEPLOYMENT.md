# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Cityday Banking Platform to Vercel.

## Project Structure

This is a monorepo with:
- **Client**: React + Vite frontend (located in `/client`)
- **API**: Express.js backend (located in `/api`)

## Pre-Deployment Checklist

### 1. Environment Variables

Set the following environment variables in Vercel Dashboard (Settings → Environment Variables):

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
ADMIN_EMAIL=admin@citi.com
ADMIN_PASSWORD=your_admin_password
PORT=5000
```

**Important**: 
- Use MongoDB Atlas connection string for `MONGO_URI`
- Generate a strong random string for `JWT_SECRET`
- For Gmail, use an App Password (not your regular password) for `EMAIL_PASS`
- The admin user will be automatically created on first deployment

### 2. Vercel Configuration

The project includes a `vercel.json` file with the following configuration:

- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: Installs dependencies for root, client, and API
- **API Routes**: All `/api/*` requests are routed to the Express serverless function
- **Frontend Routes**: All other routes serve the React app

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository: `citie-coder/citydaytest`

3. **Configure Project Settings**
   - **Root Directory**: Leave as `.` (root of repository)
   - **Framework Preset**: Other (or Vite if available)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install && cd client && npm install && cd ../api && npm install`

4. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add all environment variables listed above
   - Make sure to add them for Production, Preview, and Development environments

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Add environment variables when prompted

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Verify Deployment

1. **Check Frontend**: Visit your Vercel URL - you should see the React app
2. **Check API**: Visit `https://your-project.vercel.app/api/` - should return "Banking Platform API is running"
3. **Test Authentication**: Try registering a new user
4. **Test Admin**: Login with the admin credentials you set in environment variables

### Troubleshooting

#### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are listed in `package.json` files
- Verify Node.js version compatibility (Vercel uses Node 18.x by default)

#### API Routes Not Working
- Verify environment variables are set correctly
- Check MongoDB connection string is accessible from Vercel's servers
- Review serverless function logs in Vercel dashboard

#### Frontend Not Loading
- Verify `client/dist` directory is being created during build
- Check that `outputDirectory` in `vercel.json` matches the build output
- Ensure all static assets are in `client/public`

#### Database Connection Issues
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel IPs
- Verify `MONGO_URI` includes authentication credentials
- Check MongoDB Atlas network access settings

## File Structure for Vercel

```
citydaytest/
├── api/
│   ├── [...path].js          # Serverless function handler
│   ├── index.js              # Express app
│   ├── routes/               # API routes
│   ├── models/               # MongoDB models
│   └── package.json
├── client/
│   ├── src/                  # React source code
│   ├── public/               # Static assets
│   ├── dist/                 # Build output (generated)
│   └── package.json
├── vercel.json               # Vercel configuration
└── package.json              # Root package.json
```

## Important Notes

1. **Serverless Functions**: The Express app runs as a serverless function, which means:
   - Cold starts may occur on first request
   - Database connections are reused when possible
   - Each function invocation is stateless

2. **File Uploads**: If you're handling file uploads, ensure they're within Vercel's limits (4.5MB for serverless functions)

3. **Environment Variables**: Changes to environment variables require a redeployment

4. **Custom Domain**: You can add a custom domain in Vercel Settings → Domains

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review serverless function logs
3. Verify all environment variables are set
4. Ensure MongoDB Atlas is accessible

