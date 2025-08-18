import { Router } from "express";
import {
  getProfile,
  updateProfile,
  updateBasicInfo,
  deleteProfile,
} from "./profile.controller";
import { authenticateToken } from "../auth/auth.middleware";
import multer from "multer";
import path from "path";
import fs from "fs";
import { catchAsync } from "@errors/catchAsync";
// import { authenticateToken } from "../auth/auth.middleware";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const userId = req.user?.userId;
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);

    if (file.fieldname === "profileImage") {
      cb(null, `profile-${userId}-${timestamp}${extension}`);
    } else if (file.fieldname === "resume") {
      cb(null, `resume-${userId}-${timestamp}${extension}`);
    } else {
      cb(null, `${file.fieldname}-${userId}-${timestamp}${extension}`);
    }
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.fieldname === "profileImage") {
    // Allow image files only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for profile picture"), false);
    }
  } else if (file.fieldname === "resume") {
    // Allow PDF, DOC, DOCX files
    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only PDF, DOC, and DOCX files are allowed for resume"),
        false
      );
    }
  } else {
    cb(new Error("Unexpected field"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Routes
router.get("/", catchAsync(authenticateToken), getProfile);
router.put("/", catchAsync(authenticateToken), updateProfile);
router.put("/basic", catchAsync(authenticateToken), updateBasicInfo);
router.delete("/", catchAsync(authenticateToken), deleteProfile);

// File upload routes
router.post(
  "/upload",
  catchAsync(authenticateToken),
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req: any, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const uploadedFiles: any = {};

      if (files.profileImage) {
        uploadedFiles.profileImageUrl = `/uploads/${files.profileImage[0].filename}`;
      }

      if (files.resume) {
        uploadedFiles.resumeUrl = `/uploads/${files.resume[0].filename}`;
      }

      res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        data: uploadedFiles,
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload files",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

export default router;
