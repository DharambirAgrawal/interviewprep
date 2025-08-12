// Interview types and interfaces for the AI-powered interview platform

export interface InterviewQuestion {
  id: string;
  type: "audio-only" | "coding" | "behavioral" | "system-design";
  audioUrl?: string;
  title: string;
  description?: string;
  timeLimit?: number; // in minutes
  difficulty: "easy" | "medium" | "hard";
  category: string;
  // For coding questions
  codingTask?: {
    initialCode?: string;
    language?: string;
    testCases?: TestCase[];
    functionSignature?: string;
    instructions: string;
  };
  // For system design questions
  systemDesignPrompt?: {
    scenario: string;
    requirements: string[];
    constraints: string[];
  };
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface InterviewSession {
  id: string;
  title: string;
  status: "waiting" | "in-progress" | "completed" | "paused";
  startTime?: Date;
  endTime?: Date;
  currentQuestionIndex: number;
  totalQuestions: number;
  questions: InterviewQuestion[];
  responses: InterviewResponse[];
  participant: {
    id: string;
    name: string;
    email: string;
  };
  interviewer?: {
    id: string;
    name: string;
    type: "ai" | "human";
  };
}

export interface InterviewResponse {
  questionId: string;
  response: string;
  code?: string;
  language?: string;
  timestamp: Date;
  timeSpent: number; // in seconds
  audioResponse?: string; // URL to recorded audio response
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoaded: boolean;
  error?: string;
}

export interface InterviewSettings {
  autoPlayNext: boolean;
  showQuestionText: boolean;
  enableRecording: boolean;
  codeEditorTheme: "vs-dark" | "light" | "vs";
  defaultLanguage: string;
}
