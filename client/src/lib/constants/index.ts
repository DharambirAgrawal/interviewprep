// Application Constants
import { Home, Video, Settings, BarChart } from "lucide-react";

// Single source of truth for the app/brand name so it's easy to change
export const SITE_NAME = "PrepAI";
export const APP_NAME = SITE_NAME; // backwards-compatible alias
export const APP_DESCRIPTION =
  "PrepAI is your ultimate companion for AI and Machine Learning interview preparation. Practice coding, theory, system design, and real-world case studies crafted by industry experts.";

export const DEVELOPER = {
  name: "DevInnovators",
  link: "https://yourportfolio.dev",
};

// Navigation
export const MAIN_NAVIGATION = [
  { name: "Home", href: "#home" },
  { name: "Practice", href: "#practice" },
  { name: "Topics", href: "#topics" },
  { name: "Mock Interviews", href: "#mock-interviews" },
  { name: "Contact", href: "#contact" },
];

// Dashboard Navigation
export const DASHBOARD_NAVIGATION = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Interview", href: "/dashboard/interview", icon: Video },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Interview Types
export const INTERVIEW_TYPES = [
  { value: "technical", label: "Technical Interview" },
  { value: "behavioral", label: "Behavioral Interview" },
  { value: "system-design", label: "System Design" },
  { value: "coding", label: "Coding Challenge" },
  { value: "case-study", label: "Case Study" },
];

// Industries
export const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "consulting", label: "Consulting" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "gaming", label: "Gaming" },
  { value: "automotive", label: "Automotive" },
  { value: "aerospace", label: "Aerospace" },
  { value: "other", label: "Other" },
];

// Difficulty Levels
export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  DASHBOARD: "/dashboard",
  ONBOARDING: "/dashboard/onboarding",
  INTERVIEW: "/dashboard/interview",
  SETTINGS: "/dashboard/settings",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    ME: "/api/auth/me",
  },
  USER: {
    PROFILE: "/api/user/profile",
    ONBOARDING: "/api/user/onboarding",
  },
  INTERVIEW: {
    START: "/api/interview/start",
    SUBMIT: "/api/interview/submit",
    HISTORY: "/api/interview/history",
  },
} as const;

// Constants for profile and onboarding

export const INTERVIEW_STYLES = [
  { value: "traditional", label: "Traditional" },
  { value: "conversational", label: "Conversational" },
  { value: "problem_solving", label: "Problem Solving" },
  { value: "pair_programming", label: "Pair Programming" },
  { value: "whiteboard", label: "Whiteboard" },
];

export const COMMON_SKILLS = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue.js" },
  { value: "node", label: "Node.js" },
  { value: "sql", label: "SQL" },
  { value: "nosql", label: "NoSQL" },
  { value: "aws", label: "AWS" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "systemdesign", label: "System Design" },
  { value: "algorithms", label: "Algorithms & Data Structures" },
];
