import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

import {
  validateAndNormalizeEmail,
  validatePassword,
  validateRequiredFields,
  hashData,
} from "@utils/utils";
import { AppError } from "@errors/AppError";
import { sendEmail } from "services/emailService";
import { FORGET_PASSWORD_MESSAGE } from "@utils/EmailMessages";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}
// await sendEmail({
//     TO: email,
//     message: FORGET_PASSWORD_MESSAGE({
//       link: link,
//       name: updatedUser.firstName,
//     }),
//   });

// In-memory store
const users = new Map<string, User>();

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
export const login = async (req: Request, res: Response) => {
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
};

// logout

// forgot password
