type UserData = {
  firstName: string;
  lastName: string;
  interviewType: string;
  jobTitle: string;
  targetIndustry?: string;
  interviewStyle?: string;
  interviewDifficulty?: string;
  additionalNotes?: string;
  primarySkills: string[];
  weakAreas?: string[];
  interviewComfortLevel?: string;
  resumeText: string;
};
export const Users: UserData[] | [] = [];
