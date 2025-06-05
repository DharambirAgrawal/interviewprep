type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  interviewType: string;
  jobTitle: string;
  targetIndustry?: string;
  interviewStyle?: string;
  interviewDifficulty?: string;
  additionalNotes?: string;
  primarySkills: string;
  weakAreas?: string;
  interviewComfortLevel?: string;
  resume: string;
  resumeSummary: string;
  createdAt: Date; // ISO date string
};
export const Users: UserData[] = [
  {
    id: "123",
    firstName: "Dharambir",
    lastName: "Agrawal",
    targetIndustry: "Techno",
    jobTitle: "Web Developer ",
    interviewDifficulty: "intermediate",
    additionalNotes: "notes here",
    interviewType: "behavioral",
    interviewStyle: "timed",
    primarySkills: "Python",
    weakAreas: "skill",
    interviewComfortLevel: "5",
    resume: "",
    resumeSummary: "",
    createdAt: new Date(),
  },
];
