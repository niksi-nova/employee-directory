# Employee Directory Starter (React + Node + MongoDB Atlas)

## What this contains
- `backend/` - Node + Express API using Mongoose. JWT-based admin auth (register/login).
- `frontend/` - React app (plain CRA-style) with Login, Signup, Employee list, Search/Filter, Add/Delete.

## Quick start (locally)
1. Create a MongoDB Atlas cluster and get your connection string. See instructions: replace `<PASSWORD>` and database name.
2. Backend:
   - `cd backend`
   - create `.env` from `.env.example` and fill `MONGO_URI` and `JWT_SECRET`
   - `npm install`
   - `npm run dev` (uses nodemon) or `node server.js`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm start` (runs React dev server at http://localhost:3000)

## Notes
- This is a starter project. For production, enable HTTPS, stronger auth checks, input validation, and CORS config.
