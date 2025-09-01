import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../database/index";
import { profiles } from "../../database/schema";

const JWT_SECRET =
  process.env.JWT_SECRET || "default_secret_key_change_in_production";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "error",
          message: "Token expired",
        });
      }
      return res.status(403).json({
        status: "error",
        message: "Invalid token",
      });
    }

    (req as any).user = user;
    next();
  });
}

export async function createProfile(userId: string) {
  try {
    const newProfile = await db
      .insert(profiles)
      .values({
        userId,
      })
      .returning();
    return {
      success: true,
      data: newProfile,
    };
  } catch (error) {
    console.error("Failed to create profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
