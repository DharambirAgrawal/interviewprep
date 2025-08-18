// API Testing utility for profile endpoints
// Run this with: npm run dev

import express from "express";
import app from "./src/app";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server is running on http://localhost:${PORT}

📋 Available Profile API Endpoints:
GET    /api/profile         - Get user profile
PUT    /api/profile         - Update profile info
PUT    /api/profile/basic   - Update basic user info
POST   /api/profile/upload  - Upload profile image/resume
DELETE /api/profile         - Delete profile

🔧 Other Endpoints:
GET    /health              - Health check
POST   /api/auth/login      - User login
POST   /api/auth/register   - User registration

📁 Static Files:
GET    /uploads/*           - Access uploaded files

💡 Make sure to:
1. Set up your PostgreSQL database
2. Run migrations: npx drizzle-kit push
3. Include Authorization header: Bearer <token>
  `);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Closing HTTP server.");
  server.close(() => {
    console.log("HTTP server closed.");
  });
});

export default server;
