Gakaport
========

Introduction
- Gakaport is a prototype crowdfunding platform for creators.  
- It includes a Vite + TypeScript frontend (frontend) and an Express backend (backend).  
- The backend currently uses an in-memory data store (db.js) for demonstration and testing.

How to run (local development)
Prerequisites
- Node.js (18+ recommended)
- npm (bundled with Node)

Quick start
1. Clone the repository:
   ```
   git clone <REPO_URL>
   cd Gakaport
   ```

2. Install top-level dependencies (serverless helper used for Vercel builds):
   ```
   npm install
   ```

3. Install backend and frontend dependencies:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. Start the backend (local API server):
   ```
   # from repo root
   node backend/server.js
   ```
   - The backend listens on `http://localhost:3000` by default.

5. Start the frontend dev server:
   ```
   cd frontend
   npm run dev
   ```
   - Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

6. Quick API check:
   ```
   curl http://localhost:3000/api/creators/featured
   ```
   - This should return the creators JSON array used by the frontend.

Build & deploy (Vercel - single project)
- Recommended approach for quick deployment: deploy the repository to Vercel as a single project that serves the static frontend and serverless backend.
- Environment variable (Vercel) — set before building:
  - `VITE_API_BASE_URL` = api
  - After changing env vars, trigger a rebuild (redeploy) so the client bundle picks up the value.

Notes
- Data persistence: db.js is in-memory. All data will reset on restart/redeploy. For production use, add a persistent database (Supabase, Neon, PlanetScale, etc.).
- Switching backend hosting: you can host the backend separately (Render, Railway, Replit). If you do, set `VITE_API_BASE_URL` in Vercel to your backend URL (e.g., `https://your-backend.example.com/api`).
- Debugging:
  - Backend logs appear in the terminal when running `node backend/server.js`.
  - On Vercel check Deployment → Functions / Runtime Logs for serverless errors.

If you want, I can:
- Commit this README for you, or
- Apply the small public/static move for the navbar assets and push the fix used in deployment.