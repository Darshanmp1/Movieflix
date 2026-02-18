const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection (will auto-connect)
require('./config/database');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'client', 'build');
  
  console.log('Build path:', buildPath);
  console.log('Serving static files from:', buildPath);
  
  // Serve static files from React build
  app.use(express.static(buildPath));
  
  // Handle React routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath);
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
