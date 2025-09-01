import { Router } from "express";
import {
  getProfile,
  updateProfile,
  updateBasicInfo,
  deleteProfile,
} from "./profile.controller";
import { authenticateToken } from "../auth/auth.middleware";
import { catchAsync } from "@errors/catchAsync";

const router = Router();

// Routes
router.get("/:id", catchAsync(authenticateToken), getProfile);
router.put("/:id", catchAsync(authenticateToken), updateProfile);
// router.put("/basic", catchAsync(authenticateToken), updateBasicInfo);
router.delete("/", catchAsync(authenticateToken), deleteProfile);

export default router;
