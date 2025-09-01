// Profile API service
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export interface ProfileData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: {
    jobTitle?: string;
    company?: string;
    bio?: string;
    profileImageUrl?: string;
    resumeUrl?: string;
    targetIndustry?: string;
    interviewDifficulty?: string;
    interviewType?: string;
    interviewStyle?: string;
    primarySkills?: string;
    weakAreas?: string;
    interviewComfortLevel?: number;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface ProfileUpdateData {
  jobTitle?: string;
  company?: string;
  bio?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
  targetIndustry?: string;
  interviewDifficulty?: string;
  interviewType?: string;
  interviewStyle?: string;
  primarySkills?: string;
  weakAreas?: string;
  interviewComfortLevel?: number;
}

export interface BasicInfoUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

// Get authentication token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Create authorization headers
const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Get user profile
export const getUserProfile = async (id: string): Promise<ProfileData> => {
  const response = await fetch(`${API_BASE_URL}/profile/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data;
};

// Update profile information
export const updateProfile = async (
  profileData: ProfileUpdateData
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.statusText}`);
  }

  return response.json();
};

// Update basic user information
export const updateBasicInfo = async (
  basicInfo: BasicInfoUpdateData
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/profile/basic`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(basicInfo),
  });

  if (!response.ok) {
    throw new Error(`Failed to update basic info: ${response.statusText}`);
  }

  return response.json();
};

// Upload files (profile image and/or resume)
export const uploadFiles = async (files: {
  profileImage?: File;
  resume?: File;
}): Promise<any> => {
  const formData = new FormData();

  if (files.profileImage) {
    formData.append("profileImage", files.profileImage);
  }

  if (files.resume) {
    formData.append("resume", files.resume);
  }

  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/profile/upload`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload files: ${response.statusText}`);
  }

  return response.json();
};
