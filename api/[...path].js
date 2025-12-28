// Vercel serverless function - catch-all for all API routes
// This file handles all /api/* requests and routes them to the Express app

const app = require('./index');

// Export handler for Vercel serverless functions
// Vercel automatically routes /api/* requests to this function
// The Express app handles the routing internally
module.exports = (req, res) => {
  // Add logging for debugging (remove in production if needed)
  console.log(`[API] ${req.method} ${req.url}`);
  
  // Handle the request with Express
  return app(req, res);
};

