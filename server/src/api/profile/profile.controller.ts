import { Request, Response } from "express";
import { db } from "../../database";
import { profiles, users } from "../../database/schema";
import { eq } from "drizzle-orm";
import { catchAsync } from "../../errors/catchAsync";
import { AppError } from "../../errors/AppError";
import { z } from "zod";

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

// Validation schema for profile data
const profileSchema = z.object({
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  bio: z.string().max(500).optional(),
  profileImageUrl: z.string().url().optional(),
  resumeUrl: z.string().url().optional(),
  targetIndustry: z.string().optional(),
  interviewDifficulty: z
    .enum(["beginner", "intermediate", "advanced", "expert"])
    .optional(),
  interviewType: z
    .enum(["technical", "behavioral", "system_design", "case_study", "mixed"])
    .optional(),
  interviewStyle: z
    .enum([
      "traditional",
      "conversational",
      "problem_solving",
      "pair_programming",
      "whiteboard",
    ])
    .optional(),
  primarySkills: z.string().optional(),
  weakAreas: z.string().optional(),
  interviewComfortLevel: z.number().min(1).max(10).optional(),
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  try {
    // Get user basic info
    const user = await db
      .select({
        userId: users.userId,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(users)
      .where(eq(users.userId, userId))
      .limit(1);

    if (!user.length) {
      throw new AppError("User not found", 404);
    }

    // Get profile info
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    const profileData = profile.length > 0 ? profile[0] : null;

    // Combine user and profile data
    const responseData = {
      ...user[0],
      profile: profileData
        ? {
            jobTitle: profileData.jobTitle,
            company: profileData.company,
            bio: profileData.bio,
            profileImageUrl: profileData.profileImageUrl,
            resumeUrl: profileData.resumeUrl,
            targetIndustry: profileData.targetIndustry,
            interviewDifficulty: profileData.interviewDifficulty,
            interviewType: profileData.interviewType,
            interviewStyle: profileData.interviewStyle,
            primarySkills: profileData.primarySkills,
            weakAreas: profileData.weakAreas,
            interviewComfortLevel: profileData.interviewComfortLevel,
            createdAt: profileData.createdAt,
            updatedAt: profileData.updatedAt,
          }
        : null,
    };

    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new AppError("Failed to fetch profile", 500);
  }
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  try {
    // Validate the request body
    const validationResult = profileSchema.safeParse(req.body);

    if (!validationResult.success) {
      throw new AppError("Invalid profile data", 400);
    }

    const profileData = validationResult.data;

    // Check if user exists
    const userExists = await db
      .select({ userId: users.userId })
      .from(users)
      .where(eq(users.userId, userId))
      .limit(1);

    if (!userExists.length) {
      throw new AppError("User not found", 404);
    }

    // Check if profile exists
    const existingProfile = await db
      .select({ id: profiles.id })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    let updatedProfile;

    if (existingProfile.length > 0) {
      // Update existing profile
      updatedProfile = await db
        .update(profiles)
        .set({
          ...profileData,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, userId))
        .returning();
    } else {
      // Create new profile
      updatedProfile = await db
        .insert(profiles)
        .values({
          userId,
          ...profileData,
        })
        .returning();
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile[0],
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Failed to update profile", 500);
  }
});

export const updateBasicInfo = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const basicInfoSchema = z.object({
      firstName: z.string().min(2).optional(),
      lastName: z.string().min(2).optional(),
      email: z.string().email().optional(),
    });

    try {
      const validationResult = basicInfoSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppError("Invalid basic info data", 400);
      }

      const { firstName, lastName, email } = validationResult.data;

      // Check if email is already taken by another user
      if (email) {
        const emailExists = await db
          .select({ userId: users.userId })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (emailExists.length > 0 && emailExists[0].userId !== userId) {
          throw new AppError("Email is already in use", 409);
        }
      }

      // Update user basic info
      const updatedFields: any = { updatedAt: new Date() };
      if (firstName) updatedFields.firstName = firstName;
      if (lastName) updatedFields.lastName = lastName;
      if (email) updatedFields.email = email;

      const updatedUser = await db
        .update(users)
        .set(updatedFields)
        .where(eq(users.userId, userId))
        .returning({
          userId: users.userId,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          updatedAt: users.updatedAt,
        });

      res.status(200).json({
        success: true,
        message: "Basic information updated successfully",
        data: updatedUser[0],
      });
    } catch (error) {
      console.error("Error updating basic info:", error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to update basic information", 500);
    }
  }
);

export const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  try {
    // Delete profile (this will not delete the user account, just the profile data)
    await db.delete(profiles).where(eq(profiles.userId, userId));

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw new AppError("Failed to delete profile", 500);
  }
});
