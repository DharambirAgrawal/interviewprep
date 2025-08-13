import * as z from "zod";

// Authentication Schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Onboarding Schema
export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  resume: z.custom<FileList>(
    (val) => {
      return (
        typeof FileList !== "undefined" &&
        val instanceof FileList &&
        val.length > 0
      );
    },
    { message: "Resume is required" }
  ),
  targetIndustry: z.string().min(1, "Please select your target industry"),
  jobTitle: z.string().min(1, "Please enter your current job title"),
  interviewDifficulty: z
    .string()
    .min(1, "Please select your preferred difficulty level"),
  interviewType: z.string().min(1, "Select at least one interview type"),
  interviewStyle: z
    .string()
    .min(1, "Please select your preferred interview style"),
  primarySkills: z.string().min(1, "Please enter at least one primary skill"),
  weakAreas: z.string().optional(),
  interviewComfortLevel: z.string().refine(
    (val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 1 && num <= 10;
    },
    { message: "Comfort level must be between 1 and 10" }
  ),
  additionalNotes: z.string().max(500).optional(),
});

// Type exports
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
