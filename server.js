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

// Serve React app - always in production
const buildPath = path.join(__dirname, 'client', 'build');
console.log('='.repeat(50));
console.log('Build path:', buildPath);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Serving static files...');
console.log('='.repeat(50));

app.use(express.static(buildPath));

// Handle React routing - return index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  console.log('Request for:', req.url, '-> serving index.html');
  res.sendFile(indexPath);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
