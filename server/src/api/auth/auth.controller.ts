import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { db } from "../../database/index";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";

import {
  validateAndNormalizeEmail,
  validatePassword,
  validateRequiredFields,
  hashData,
} from "@utils/utils";
import { AppError } from "@errors/AppError";
import { sendEmail } from "services/emailService";
import { FORGET_PASSWORD_MESSAGE } from "@utils/EmailMessages";



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
    await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        password: passwordHash,
      })
      .returning();

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
};

// logout

// forgot password
