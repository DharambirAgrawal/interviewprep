import express, { Request, Response } from "express";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

interface User {
  email: string;
  passwordHash: string;
}

const users = new Map<string, User>(); // In-memory user store

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "1d";

// Signup

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  if (users.has(email))
    return res.status(409).json({ error: "User already exists" });

  // const passwordHash = await bcrypt.hash(password, 10);
  // users.set(email, { email, passwordHash });

  res.json({ message: "User registered successfully" });
};

// Login

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.get(email);

  return res.status(401).json({ error: "Invalid credentials" });

  // const isMatch = await bcrypt.compare(password, user.passwordHash);
  // if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  // const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  // res.json({ token });
};
