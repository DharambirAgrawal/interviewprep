import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { Users } from "../../database/user"; // Your in-memory storage
// import { extractTextFromResume } from "../../utils/resumeParser"; // hypothetical utility
import { v4 as uuidv4 } from "uuid";

export const user_onboarding = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    targetIndustry,
    jobTitle,
    interviewDifficulty,
    additionalNotes,
    interviewType,
    interviewStyle,
    primarySkills,
    weakAreas,
    interviewComfortLevel,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !jobTitle ||
    !interviewType ||
    !primarySkills
  ) {
    throw new AppError("Missing required fields!", 400);
  }

  // Handle resume file
  if (
    !req.files ||
    (Array.isArray(req.files) && req.files.length === 0) ||
    (!Array.isArray(req.files) && Object.keys(req.files).length === 0)
  ) {
    throw new AppError("No Resume found", 400);
  }
  const files = Array.isArray(req.files)
    ? req.files
    : Object.values(req.files).flat();
  const resumeFile = req.file;
  console.log(files);
  let resumeText = "";

  if (resumeFile) {
    // # send the resume to python backend
    // resumeText = await extractTextFromResume(resumeFile);
  }

  const userData = {
    id: uuidv4(),
    firstName,
    lastName,
    targetIndustry,
    jobTitle,
    interviewDifficulty,
    additionalNotes,
    interviewType,
    interviewStyle,
    primarySkills, // assuming comma-separated
    weakAreas,
    interviewComfortLevel,
    resumeText,
    createdAt: new Date(),
  };

  // Store in memory
  Users.push(userData);

  console.log(Users);

  // Send back response
  res.status(201).json({
    status: "success",
    message: "User onboarded successfully!",
    data: {
      id: userData.id,
      name: `${firstName} ${lastName}`,
      role: jobTitle,
      industry: targetIndustry,
      resumeSummary: resumeText.substring(0, 200) + "...", // preview
    },
  });
};

export const get_onboarded_user = async (req: Request, res: Response) => {
  const userId = req.params.id;

  // Find user in memory store
  const user = Users.find((u) => u.id === userId);

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
};
