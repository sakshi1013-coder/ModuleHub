const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/modulehub';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Create a mock Socket.IO instance for serverless (Socket.IO doesn't work in serverless)
// This prevents crashes when controllers try to use req.app.get('io')
const mockIO = {
  to: () => mockIO,
  emit: () => {},
  on: () => {},
  join: () => {}
};
app.set('io', mockIO);

// Routes - Vercel passes the full path including /api to the serverless function
// So routes should be mounted with /api prefix to match incoming requests
app.use('/api/auth', require('../server/routes/auth.routes'));
app.use('/api/packages', require('../server/routes/package.routes'));
app.use('/api/notifications', require('../server/routes/notification.routes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'ModuleHub API is running' });
});

// Export for Vercel serverless
module.exports = app;
