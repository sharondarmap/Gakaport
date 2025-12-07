Gakaport
========

Introduction
- Gakaport adalah prototype crowdfunding platform untuk creators.  
- Backend masih menggunakkan in-memory data store (db.js) untuk prototipe dan testing

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
