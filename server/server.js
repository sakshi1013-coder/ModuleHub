const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
// Trigger restart

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for now, tighten for prod
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/modulehub';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to routers
app.set('io', io);

// Socket Connection Logic
io.on('connection', (socket) => {
  console.log('New client connected: ' + socket.id);

  // Join user to their company room for targeted notifications
  socket.on('join_company', (companyId) => {
    if (companyId) {
      socket.join(companyId);
      console.log(`Socket ${socket.id} joined company: ${companyId} `);
    }
  });

  // Join user to their personal room
  socket.on('join_user', (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined user room: ${userId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/components', require('./routes/component.routes'));
app.use('/api/packages', require('./routes/package.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('ModuleHub API is running');
});

const PORT = process.env.PORT || 5001;

// Only listen if not in test mode
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Server running on port ${PORT} `));
}

module.exports = { app, server }; // Export server for tests
