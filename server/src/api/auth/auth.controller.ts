import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { db } from "../../database/index";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";
import { createProfile } from "./auth.middleware";
import {
  validateAndNormalizeEmail,
  validatePassword,
  validateRequiredFields,
  hashData,
} from "@utils/utils";
import { AppError } from "@errors/AppError";

// Signup
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

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already registered" });
    }

    const passwordHash = await hashData(password);
    const newUser = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        password: passwordHash,
      })
      .returning();

    // creating profile

    const createProfileResult = await createProfile(newUser[0].userId);

    if (!createProfileResult.success) {
      throw new AppError("Failed to create user profile", 500);
    }

    const payload = {
      email,
      firstName,
      lastName,
      userId: newUser[0].userId,
    };

    const options: SignOptions = {
      expiresIn:
        (process.env.TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]) || "24h",
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default_secret_key_change_in_production",
      options
    );

    res.status(201).json({
      status: "success",
      data: {
        token,
        user: {
          id: newUser[0].userId,
          email: newUser[0].email,
          firstName: newUser[0].firstName,
          lastName: newUser[0].lastName,
        },
      },
    });
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

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || user.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const dbUser = user[0];
    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const payload = {
      email: dbUser.email,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      userId: dbUser.userId,
    };

    const options: SignOptions = {
      expiresIn:
        (process.env.TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]) || "24h",
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default_secret_key_change_in_production",
      options
    );

    return res.status(200).json({
      status: "success",
      data: {
        token,
        user: {
          id: dbUser.userId,
          email: dbUser.email,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
        },
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

// Verify Token
export const verifyToken = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user || !user.email) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
    }

    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email))
      .limit(1);

    if (!dbUser || dbUser.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        user: {
          id: dbUser[0].userId,
          email: dbUser[0].email,
          firstName: dbUser[0].firstName,
          lastName: dbUser[0].lastName,
        },
      },
    });
  } catch (err) {
    console.error("Token verification error:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

// Optional: Logout - placeholder (JWT is stateless)
export const logout = (_req: Request, res: Response) => {
  // In JWT, logout can be handled on client-side by deleting token.
  // To invalidate server-side, implement token blacklisting (e.g., Redis).
  return res.status(200).json({
    status: "success",
    message: "Logged out successfully (client should delete the token)",
  });
};
