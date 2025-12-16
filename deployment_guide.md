# Deployment Guide for ModuleHub on Vercel

It looks like the deployment failed because the project structure (Monorepo with Client/Server) wasn't fully configured for Vercel's expectations.

I have set up the necessary configuration files (`vercel.json`, `package.json` scripts, `api/index.js`).

## 1. Project Settings in Vercel
Go to your Vercel Dashboard -> Project Settings.

### Build & Development Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
  - *Note*: This runs the root build script I created, which installs everything and moves files to `dist`.
- **Output Directory**: `dist`
  - *Important*: Ensure this is set to `dist`, NOT `client/dist`.
- **Install Command**: `npm install`

### Environment Variables
You MUST add these variables in Vercel Settings -> Environment Variables:

1.  `MONGODB_URI`: Your MongoDB connection string (e.g., MongoDB Atlas).
    -   *Crucial*: Localhost won't work on Vercel. You need a cloud database.
2.  `VITE_API_URL`: `/api` (or your full production URL if needed, but `/api` works with the new setup).
3.  `JWT_SECRET`: Your secret key.

## 2. Real-time Features (Socket.IO) Note
**Important**: Vercel Serverless Functions do not support persistent WebSocket connections (Socket.IO) natively because they spin down after execution.
-   The HTTP API (Login, Publish, Get Packages) will work.
-   Real-time notifications might fall back to long-polling or not work reliably. for production apps, we typically host the socket server separately (e.g., on Render/Heroku) or use a service like Pusher.
-   *For now, the app will load and function for standard tasks.*

## 3. Redeploy
1.  Push these changes to GitHub.
2.  Vercel should automatically trigger a new deployment.
3.  If "404" persists, check the "Deployment" tab -> "Source" to see if the `dist` folder exists.
