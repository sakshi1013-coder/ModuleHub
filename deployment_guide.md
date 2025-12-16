# Deployment Guide for ModuleHub - Final Steps

The routing issue (404 on Homepage) is likely due to a conflict between the legacy configuration file and the Vercel Dashboard settings. I have simplified the configuration.

## 1. Push Changes
Push the updated `vercel.json` to GitHub.
```bash
git add .
git commit -m "fix: simplify vercel.json for correct static routing"
git push origin main
```

## 2. Verify Vercel Dashboard Settings (CRITICAL)
Go to **Vercel Dashboard** -> **Settings** -> **General** -> **Build & Development Settings**.
Ensure ONLY these are set:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
  - *If this is generic or empty, click Override and type `dist`.*
- **Install Command**: `npm install`

## 3. Environment Variables
Ensure `MONGODB_URI` is set.
- If you don't have a Mongo Cluster, create a free one on [MongoDB Atlas](https://www.mongodb.com/atlas/database).
- Get the Connection String (driver Node.js).
- Paste it into Vercel env vars.

## 4. Redeploy
Go to **Deployments** tab -> Click the three dots on the latest commit -> **Redeploy**.
This ensures the new settings/file are picked up cleanly.
