const express = require('express');
const cors = require('cors');
const dbConnect = require('./lib/dbConnect');

// Load .env only in local dev (Vercel injects env vars directly in production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

/**
 * DB-connection middleware — runs before every request.
 *
 * Awaits dbConnect() which either:
 *   • Returns the cached connection instantly (warm invocation)
 *   • Opens and awaits a new connection (cold start)
 *
 * This guarantees Mongoose is fully connected before any query runs,
 * eliminating the "buffering timed out" error in serverless environments.
 */
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error('DB connection middleware error:', err.message);
    res.status(503).json({
      msg: 'Database unavailable. Please try again shortly.',
      error: err.message
    });
  }
});

// ── Mock Socket.IO ────────────────────────────────────────────────────────────
// Socket.IO doesn't work in serverless. This mock prevents crashes in
// controllers that call req.app.get('io').to(...).emit(...)
const mockIO = {
  to: function () { return mockIO; },
  emit: function () {},
  on:   function () {},
  join: function () {}
};
app.set('io', mockIO);

// ── Routes ────────────────────────────────────────────────────────────────────
// Vercel forwards the full /api/... path to this function, so mount with prefix
app.use('/api/auth',          require('../server/routes/auth.routes'));
app.use('/api/packages',      require('../server/routes/package.routes'));
app.use('/api/notifications', require('../server/routes/notification.routes'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api', (req, res) => {
  res.json({
    message: 'ModuleHub API is running',
    timestamp: new Date().toISOString()
  });
});

// ── Export for Vercel serverless ──────────────────────────────────────────────
module.exports = app;
