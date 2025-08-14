import bcrypt from "bcryptjs";
import { AppError } from "../errors/AppError";

/**
 * Normalizes and validates the format of an email address.
 *
 * @param email - The email address to validate.
 * @returns {string} - The normalized (lowercased, trimmed) email if valid.
 * @throws {AppError} - If email is invalid.
 */
export function validateAndNormalizeEmail(email: string): string {
  if (!email) {
    throw new AppError("Email is required", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();
  // RFC 5322 simplified regex
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new AppError("Invalid email format", 400);
  }

  return normalizedEmail;
}

/**
 * Validates the strength of a password.
 *
 * @param password - The password to validate.
 * @throws {AppError} - If the password does not meet security requirements.
 */
export function validatePassword(password: string): void {
  if (!password) {
    throw new AppError("Password is required", 400);
  }

  const minLength = parseInt(process.env.PASSWORD_MIN_LENGTH || "8", 10);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length < minLength ||
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumber ||
    !hasSpecialChar
  ) {
    throw new AppError(
      `Password must be at least ${minLength} characters long and include uppercase, lowercase, number, and special character`,
      400
    );
  }
}

/**
 * Hashes a piece of data
 *
 * @param data - The data to hash.
 * @returns {Promise<string>} - The hashed data.
 */
export async function hashData(data: string): Promise<string> {
  if (!data) throw new AppError("Data to hash is required", 400);
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(data, salt);
}

/**
 * Compares a plain password with a hashed password.
 *
 * @param plainPassword - The plain password entered by the user.
 * @param hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  if (!plainPassword || !hashedPassword) {
    throw new AppError("Both passwords are required for comparison", 400);
  }

  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new AppError("Error comparing passwords", 500);
  }
}

/**
 * Validates that required fields exist and are not empty/whitespace.
 *
 * @param requiredFields - Array of required field names.
 * @param fields - Object containing field values.
 * @throws {AppError} - If any required fields are missing.
 */
export function validateRequiredFields(
  requiredFields: string[],
  fields: Record<string, unknown>
): void {
  const missingFields = requiredFields.filter(
    (field) => !fields[field] || (typeof fields[field] === "string" && !(fields[field] as string).trim())
  );

  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }
}
