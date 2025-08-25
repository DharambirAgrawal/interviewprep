"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useToastNotifications } from "./useToast";
import { useToastMessages } from "@/lib/toastMessages";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface ApiResponse {
  status: string;
  message?: string;
  data?: {
    token: string;
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
}

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080/api";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToastNotifications();
  const toastMessages = useToastMessages();

  useEffect(() => {
    // Check for existing session on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Verify token with the server
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          setUser(data.data.user);
          localStorage.setItem("user", JSON.stringify(data.data.user));
        } else {
          // Token invalid, clear storage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } else {
        // Token verification failed, clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        toastMessages.auth.loginError(data.message);
        throw new Error(data.message || "Login failed");
      }

      if (data.status === "success" && data.data?.token) {
        // Decode the JWT to get user info
        const base64Url = data.data.token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(window.atob(base64));

        const userData: User = {
          id: payload.userId || payload.id || "1",
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.data.token);

        // Also set token in cookies for middleware
        document.cookie = `token=${data.data.token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`; // 7 days

        toastMessages.auth.loginSuccess(
          `${userData.firstName} ${userData.lastName}`
        );
        return;
      }

      // If we reach here, it means we have a success response but no token
      toastMessages.auth.loginError("Invalid response from server");
      throw new Error("Login failed: Invalid response from server");
    } catch (error) {
      console.error("Login failed:", error);
      // Don't show another toast here - we already showed one above
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData: ApiResponse = await response.json();

      if (!response.ok) {
        toastMessages.auth.signupError(responseData.message);
        throw new Error(responseData.message || "Signup failed");
      }

      if (responseData.status === "success" && responseData.data?.token) {
        // Decode the JWT to get user info
        const base64Url = responseData.data.token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(window.atob(base64));

        const userData: User = {
          id: payload.userId || payload.id || "1",
          email: payload.email,
          firstName: data.firstName,
          lastName: data.lastName,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", responseData.data.token);

        // Also set token in cookies for middleware
        document.cookie = `token=${responseData.data.token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`; // 7 days

        toastMessages.auth.signupSuccess(
          `${userData.firstName} ${userData.lastName}`
        );
        return;
      }

      // If we reach here, it means we have a success response but no token
      toastMessages.auth.signupError("Invalid response from server");
      throw new Error("Signup failed: Invalid response from server");
    } catch (error) {
      console.error("Signup failed:", error);
      // Don't show another toast here - we already showed one above
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // No need to call API for logout as we're using JWT
    // Just remove the token from localStorage and cookies
    const firstName = user?.firstName || "";
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Remove token from cookies
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    toastMessages.auth.logoutSuccess();
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
