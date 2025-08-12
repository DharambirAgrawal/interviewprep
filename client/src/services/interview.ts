import {
  InterviewSession,
  InterviewQuestion,
  InterviewResponse,
} from "@/types/interview";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export class InterviewService {
  /**
   * Fetch interview session by ID
   */
  static async getInterviewSession(
    sessionId: string
  ): Promise<InterviewSession> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/interview/sessions/${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch interview session: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching interview session:", error);
      return this.getMockInterviewSession(sessionId); // Development fallback
    }
  }

  /**
   * Fetch next question in the interview
   */
  static async getNextQuestion(
    sessionId: string,
    currentIndex: number
  ): Promise<InterviewQuestion | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/interview/sessions/${sessionId}/questions/${currentIndex}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(
          `Failed to fetch next question: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching next question:", error);
      return this.getMockQuestion(currentIndex);
    }
  }

  /**
   * Submit interview response
   */
  static async submitResponse(
    sessionId: string,
    response: Omit<InterviewResponse, "timestamp">
  ): Promise<boolean> {
    try {
      const responseWithTimestamp: InterviewResponse = {
        ...response,
        timestamp: new Date(),
      };

      const apiResponse = await fetch(
        `${API_BASE_URL}/interview/sessions/${sessionId}/responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseWithTimestamp),
        }
      );

      if (!apiResponse.ok) {
        throw new Error(`Failed to submit response: ${apiResponse.statusText}`);
      }

      return true;
    } catch (error) {
      console.error("Error submitting response:", error);
      return true; // Mock success for development
    }
  }

  /**
   * Update interview session status
   */
  static async updateSessionStatus(
    sessionId: string,
    status: InterviewSession["status"]
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/interview/sessions/${sessionId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error("Error updating session status:", error);
      return true; // Mock success for development
    }
  }

  /**
   * Get audio URL for question (handles both direct URLs and blob URLs)
   */
  static getAudioUrl(audioUrl: string): string {
    if (audioUrl.startsWith("http") || audioUrl.startsWith("blob:")) {
      return audioUrl;
    }

    if (audioUrl.startsWith("/mock-audio/")) {
      // Return a base64-encoded silent audio track for development
      return "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAIlYAAHsAAAABAAgAZGF0YQQAAAAAAA==";
    }

    return `${API_BASE_URL}/audio/${audioUrl}`;
  }

  // -------------------------------------
  // Mock Data (for development/testing)
  // -------------------------------------

  private static getMockInterviewSession(sessionId: string): InterviewSession {
    return {
      id: sessionId,
      title: "Senior Software Engineer Interview",
      status: "waiting",
      currentQuestionIndex: 0,
      totalQuestions: 5,
      questions: [],
      responses: [],
      participant: {
        id: "user-123",
        name: "John Doe",
        email: "john.doe@example.com",
      },
      interviewer: {
        id: "ai-interviewer",
        name: "AI Interviewer",
        type: "ai",
      },
    };
  }

  private static getMockQuestion(index: number): InterviewQuestion | null {
    const mockQuestions: InterviewQuestion[] = [
      {
        id: "q1",
        type: "audio-only",
        audioUrl: "/mock-audio/introduction.mp3",
        title: "Introduction",
        description: "Tell me about yourself and your experience.",
        timeLimit: 5,
        difficulty: "easy",
        category: "behavioral",
      },
      {
        id: "q2",
        type: "coding",
        audioUrl: "/mock-audio/two-sum.mp3",
        title: "Two Sum Problem",
        description: "Solve the classic two sum problem.",
        timeLimit: 15,
        difficulty: "easy",
        category: "algorithms",
        codingTask: {
          initialCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your solution here
};`,
          language: "javascript",
          functionSignature: "twoSum(nums, target)",
          instructions:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
          testCases: [
            {
              input: "nums = [2,7,11,15], target = 9",
              expectedOutput: "[0,1]",
              description: "Because nums[0] + nums[1] = 2 + 7 = 9",
            },
          ],
        },
      },
      {
        id: "q3",
        type: "behavioral",
        audioUrl: "/mock-audio/conflict-resolution.mp3",
        title: "Conflict Resolution",
        description:
          "Describe a time when you had to resolve a conflict with a team member.",
        timeLimit: 8,
        difficulty: "medium",
        category: "behavioral",
      },
      {
        id: "q4",
        type: "system-design",
        audioUrl: "/mock-audio/design-chat.mp3",
        title: "Design a Chat System",
        timeLimit: 25,
        difficulty: "hard",
        category: "system-design",
        systemDesignPrompt: {
          scenario: "Design a real-time chat application like WhatsApp",
          requirements: [
            "Support 1-on-1 and group messaging",
            "Real-time message delivery",
            "Message persistence",
            "Support for 100M+ users",
          ],
          constraints: [
            "Messages should be delivered within 100ms",
            "System should be highly available",
            "Support multimedia messages",
          ],
        },
      },
      {
        id: "q5",
        type: "coding",
        audioUrl: "/mock-audio/binary-tree.mp3",
        title: "Binary Tree Traversal",
        timeLimit: 20,
        difficulty: "medium",
        category: "data-structures",
        codingTask: {
          initialCode: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    // Your solution here
};`,
          language: "javascript",
          functionSignature: "inorderTraversal(root)",
          instructions:
            "Given the root of a binary tree, return the inorder traversal of its nodes values.",
          testCases: [
            {
              input: "root = [1,null,2,3]",
              expectedOutput: "[1,3,2]",
            },
          ],
        },
      },
    ];

    return index < mockQuestions.length ? mockQuestions[index] : null;
  }
}
