"use client";

import { useToastNotifications } from "@/hooks/useToast";

// Reusable toast messages for common scenarios
export const useToastMessages = () => {
  const toast = useToastNotifications();

  // Authentication related messages
  const authMessages = {
    loginSuccess: (name: string) =>
      toast.success("Login Successful", `Welcome back, ${name}!`),

    loginError: (message?: string) =>
      toast.error(
        "Login Failed",
        message || "Please check your credentials and try again."
      ),

    logoutSuccess: () =>
      toast.info("Logged Out", "You have been successfully logged out."),

    signupSuccess: (name: string) =>
      toast.success(
        "Account Created",
        `Welcome to PrepAI, ${name}! Your account has been created successfully.`
      ),

    signupError: (message?: string) =>
      toast.error(
        "Signup Failed",
        message || "There was an error creating your account. Please try again."
      ),

    passwordResetEmailSent: (email: string) =>
      toast.success(
        "Reset Email Sent",
        `We've sent a password reset link to ${email}.`
      ),

    passwordResetSuccess: () =>
      toast.success(
        "Password Reset",
        "Your password has been reset successfully. You can now log in with your new password."
      ),
  };

  // Form submission related messages
  const formMessages = {
    saveSuccess: (item: string) =>
      toast.success(
        "Saved Successfully",
        `Your ${item} has been saved successfully.`
      ),

    saveError: (item: string, message?: string) =>
      toast.error(
        `Failed to Save ${item}`,
        message || "There was an error saving your data. Please try again."
      ),

    updateSuccess: (item: string) =>
      toast.success(
        "Updated Successfully",
        `Your ${item} has been updated successfully.`
      ),

    updateError: (item: string, message?: string) =>
      toast.error(
        `Failed to Update ${item}`,
        message || "There was an error updating your data. Please try again."
      ),

    deleteSuccess: (item: string) =>
      toast.success(
        "Deleted Successfully",
        `The ${item} has been deleted successfully.`
      ),

    deleteError: (item: string, message?: string) =>
      toast.error(
        `Failed to Delete ${item}`,
        message || "There was an error deleting the item. Please try again."
      ),

    validationError: (message: string) =>
      toast.error("Validation Error", message),
  };

  // API related messages
  const apiMessages = {
    loadingError: (resource: string, message?: string) =>
      toast.error(
        `Failed to Load ${resource}`,
        message || "There was an error loading the data. Please try again."
      ),

    connectionError: () =>
      toast.error(
        "Connection Error",
        "Unable to connect to the server. Please check your internet connection and try again."
      ),

    serverError: (message?: string) =>
      toast.error(
        "Server Error",
        message ||
          "There was a problem with the server. Please try again later."
      ),

    timeout: () =>
      toast.warning(
        "Request Timeout",
        "The request took too long to complete. Please try again."
      ),
  };

  return {
    auth: authMessages,
    form: formMessages,
    api: apiMessages,
    // Generic toast methods for custom messages
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
  };
};
