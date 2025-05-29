import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    (req as any).user = user;
    next();
  });
}

// import authRoutes from './routes/auth';
// // ... existing imports

// app.use('/api/auth', authRoutes);

// // Example protected route
// import { authenticateToken } from './middleware/authMiddleware';

// app.get('/api/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'You are authorized', user: (req as any).user });
// });
