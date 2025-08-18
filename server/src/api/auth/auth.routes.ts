import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import { login, signup, verifyToken } from "./auth.controller";
import rateLimit from "express-rate-limit";
import { authenticateToken } from "./auth.middleware";

const AuthRouter = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // max 5 attempts per window per IP
  message: {
    status: "error",
    message: "Too many login attempts. Try again later.",
  },
});

export const authRouter = AuthRouter.post(
  "/login",
  loginLimiter,
  catchAsync(login)
)
  .post("/signup", catchAsync(signup))
  .get("/verify", catchAsync(authenticateToken), catchAsync(verifyToken));

// .post("/reset-password",catchAsync(resetPassword))
