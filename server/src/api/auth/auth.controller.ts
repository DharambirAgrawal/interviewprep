import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import {
  validateAndNormalizeEmail,
  validatePassword,
  validateRequiredFields,
  hashData,
} from "@utils/utils";
import { AppError } from "@errors/AppError";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

// In-memory store
const users = new Map<string, User>();



const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // max 5 attempts per window per IP
  message: { error: "Too many login attempts. Try again later." },
});

//    Signup
export const signup = async (req: Request, res: Response) => {
  try {
    validateRequiredFields(
      ["firstName", "lastName", "email", "password", "confirmPassword"],
      req.body
    );

    let { firstName, lastName, email, password, confirmPassword } = req.body;
    email = validateAndNormalizeEmail(email);
    validatePassword(password);

    if (password !== confirmPassword) {
      throw new AppError("Passwords do not match", 400);
    }

    if (users.has(email)) {
      throw new AppError("Registration failed", 400);
    }

    const passwordHash = await hashData(password);
    const newUser: User = { firstName, lastName, email, passwordHash };
    users.set(email, newUser);

    const payload = { email };
    const options: SignOptions = {
      expiresIn: process.env.TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default",
      options
    );

    res.status(201).json({ status: "success", data: { token } });
  } catch (err) {
    if (err instanceof AppError) {
      return res
        .status(err.statusCode)
        .json({ status: "error", message: err.message });
    }
    console.error("Signup error:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//    login
export const login = [
  loginLimiter,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email and password are required",
        });
      }

      const user = users.get(email);
      const authError = {
        status: "error",
        message: "Invalid email or password",
      };

      if (!user) return res.status(401).json(authError);

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(401).json(authError);

      const payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const options: SignOptions = {
        expiresIn: process.env.TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET || "123", options);

      return res.status(200).json({ status: "success", data: { token } });
    } catch (err) {
      console.error("Login error:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  },
];

// logout

// forgot password
