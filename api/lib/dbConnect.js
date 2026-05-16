/**
 * dbConnect.js — Serverless-safe Mongoose connection with caching
 *
 * In Vercel serverless, each function instance is potentially reused
 * across many requests ("warm" invocations). We cache the connection
 * promise so we only call mongoose.connect() once per instance lifetime
 * instead of reconnecting on every request.
 *
 * On a "cold start" the cache is empty, so we open a new connection
 * and await it fully before any query runs — eliminating the
 * "buffering timed out" error.
 */
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in Vercel project settings.'
  );
}

// Module-level cache — survives across warm invocations of the same instance
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function dbConnect() {
  // Already connected — return immediately
  if (cached.conn) {
    return cached.conn;
  }

  // Connection already in progress — wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,   // Fail immediately if not connected (no silent buffering)
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    console.log('Opening new MongoDB connection...');
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((err) => {
        // Reset cache on failure so the next request retries
        cached.promise = null;
        console.error('MongoDB connection failed:', err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
