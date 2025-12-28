// Vercel serverless function - catch-all for all API routes
// This file handles all /api/* requests and routes them to the Express app

const app = require('./index');

// Export handler for Vercel serverless functions
// With [...path], Vercel automatically routes /api/* to this function
// The path segments are available, but Express needs the full path
module.exports = (req, res) => {
  // Reconstruct the full path from the catch-all segments
  // req.query.path contains the path segments as an array
  const pathSegments = req.query.path;
  
  if (pathSegments) {
    // Reconstruct the full API path
    const segments = Array.isArray(pathSegments) ? pathSegments : [pathSegments];
    req.url = `/api/${segments.join('/')}`;
    req.originalUrl = req.url;
  } else {
    // Fallback: if no path segments, use /api
    req.url = '/api';
    req.originalUrl = '/api';
  }
  
  // Preserve query string if present
  if (req.url.includes('?') && Object.keys(req.query).length > 1) {
    const queryString = new URLSearchParams(req.query).toString();
    req.url = req.url.split('?')[0] + '?' + queryString;
  }
  
  // Log for debugging
  console.log(`[API] ${req.method} ${req.url}`);
  
  // Handle the request with Express
  return app(req, res);
};

