"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Code,
  MessageSquare,
  Layers,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { InterviewQuestion } from "@/types/interview";
import { AudioPlayer } from "./AudioPlayer";
import { AudioPlayerState } from "@/types/interview";
import SimpleCodeEditor from "./SimpleCodeEditor";

interface QuestionDisplayProps {
  question: InterviewQuestion;
  questionNumber: number;
  totalQuestions: number;
  audioState: AudioPlayerState;
  onPlayAudio: () => void;
  onPauseAudio: () => void;
  onSeekAudio: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onSubmitAndNext: (
    response: string,
    code?: string,
    language?: string
  ) => Promise<boolean>;
  isSubmitting?: boolean;
  hasNextQuestion: boolean;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  totalQuestions,
  audioState,
  onPlayAudio,
  onPauseAudio,
  onSeekAudio,
  onVolumeChange,
  onSubmitAndNext,
  isSubmitting = false,
  hasNextQuestion,
}) => {
  const [response, setResponse] = useState("");
  const [code, setCode] = useState(question.codingTask?.initialCode || "");
  const [language, setLanguage] = useState(
    question.codingTask?.language || "javascript"
  );
  const [showCodeEditor, setShowCodeEditor] = useState(
    question.type === "coding"
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "coding":
        return <Code className="w-4 h-4" />;
      case "behavioral":
        return <MessageSquare className="w-4 h-4" />;
      case "system-design":
        return <Layers className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const handleSubmit = async () => {
    const trimmedResponse = response.trim();
    if (!trimmedResponse && question.type !== "coding") {
      return;
    }

    const success = await onSubmitAndNext(
      trimmedResponse,
      question.type === "coding" ? code : undefined,
      question.type === "coding" ? language : undefined
    );

    if (success) {
      // Reset form for next question
      setResponse("");
      setCode("");
    }
  };

  const isResponseValid = () => {
    if (question.type === "coding") {
      return code.trim().length > 0;
    }
    return response.trim().length > 0;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Question Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                Question {questionNumber} of {totalQuestions}
              </Badge>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty.charAt(0).toUpperCase() +
                  question.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                {getTypeIcon(question.type)}
                {question.type.replace("-", " ")}
              </Badge>
            </div>

            {question.timeLimit && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {question.timeLimit} min
              </Badge>
            )}
          </div>

          <CardTitle className="text-xl">{question.title}</CardTitle>
          {question.description && (
            <p className="text-gray-600 dark:text-gray-400">
              {question.description}
            </p>
          )}
        </CardHeader>
      </Card>

      {/* Audio Player */}
      {question.audioUrl && (
        <AudioPlayer
          audioState={audioState}
          onPlay={onPlayAudio}
          onPause={onPauseAudio}
          onSeek={onSeekAudio}
          onVolumeChange={onVolumeChange}
          title="Interview Question"
        />
      )}

      {/* Coding Task Details */}
      {question.type === "coding" && question.codingTask && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Coding Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Instructions:</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {question.codingTask.instructions}
              </p>
            </div>

            {question.codingTask.testCases &&
              question.codingTask.testCases.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Test Cases:</h4>
                  <div className="space-y-2">
                    {question.codingTask.testCases.map((testCase, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
                      >
                        <div className="font-mono text-sm">
                          <div>
                            <strong>Input:</strong> {testCase.input}
                          </div>
                          <div>
                            <strong>Output:</strong> {testCase.expectedOutput}
                          </div>
                          {testCase.description && (
                            <div className="text-gray-600 dark:text-gray-400 mt-1">
                              {testCase.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* System Design Details */}
      {question.type === "system-design" && question.systemDesignPrompt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              System Design Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Scenario:</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {question.systemDesignPrompt.scenario}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Requirements:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                {question.systemDesignPrompt.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Constraints:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                {question.systemDesignPrompt.constraints.map(
                  (constraint, index) => (
                    <li key={index}>{constraint}</li>
                  )
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Code Editor */}
      {question.type === "coding" && showCodeEditor && (
        <Card>
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleCodeEditor
              initialCode={code}
              language={language}
              onCodeChange={setCode}
              onLanguageChange={setLanguage}
              readOnly={false}
            />
          </CardContent>
        </Card>
      )}

      {/* Response Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Your Response
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type !== "coding" && (
            <Textarea
              placeholder="Type your response here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[120px]"
              disabled={isSubmitting}
            />
          )}

          {question.type === "coding" && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Your solution will be submitted from the code editor above
                </span>
              </div>
            </div>
          )}

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {!isResponseValid() && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Please provide a response before continuing</span>
                </>
              )}
              {isResponseValid() && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Ready to submit</span>
                </>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isResponseValid() || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : hasNextQuestion ? (
                <>
                  Submit & Next
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                "Submit & Complete"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
