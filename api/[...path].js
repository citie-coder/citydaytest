// Vercel serverless function - catch-all for all API routes
// This file handles all /api/* requests and routes them to the Express app

const app = require('./index');

// Export the Express app for Vercel serverless functions
// Vercel will automatically handle the request routing to Express
module.exports = app;

