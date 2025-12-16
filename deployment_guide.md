# Vercel Deployment Debugging & Fixes

We encountered 404 errors likely due to missing dependencies in the root for the serverless functions and potential build path mismatches.

## Fixes Applied
1.  **Dependencies**: Added production dependencies (`express`, `mongoose`, `cors`, etc.) to the **ROOT** `package.json`. Vercel Cloud functions run from the root, so they need these modules available there.
2.  **Build Script**: Updated `npm run build` to explicitly:
    -   Install Client Deps
    -   Install Server Deps
    -   Build Vite Client
    -   **Move** Client `dist` to Root `dist` (This is key!)
3.  **Vercel Config**: Simplified `vercel.json` to standard rewrites:
    -   `/api/*` -> `api/index.js`
    -   `/*` -> `index.html` (Frontend)

## Action Required
1.  **Wait for Deployment**: The latest commit `fix: add production dependencies...` should trigger a new build on Vercel.
2.  **Check Vercel Logs**:
    -   If it fails, look for "Module not found" errors.
3.  **Verify Settings**:
    -   Output Directory: `dist`
    -   Build Command: `npm run build`
    -   Env Vars: `MONGODB_URI`, `JWT_SECRET`, `VITE_API_URL` (/api)

## Expected Result
-   Home URL `/` loads the React App.
-   `/api` endpoint (if visited) relies on the serverless function cold-start.

**Note**: If you still see 404s on the *Frontend* routes (like /login) after a refresh, it's handled by the `vercel.json` rewrite to `index.html`.
