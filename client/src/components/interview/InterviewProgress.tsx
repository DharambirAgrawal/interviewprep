"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface InterviewProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  completedQuestions: number;
  timeElapsed?: number; // in minutes
}

export const InterviewProgress: React.FC<InterviewProgressProps> = ({
  currentQuestion,
  totalQuestions,
  completedQuestions,
  timeElapsed,
}) => {
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Interview Progress
            </h3>
            {timeElapsed !== undefined && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(timeElapsed)}
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Question {currentQuestion} of {totalQuestions}
              </span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Question Indicators */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const questionNumber = index + 1;
              const isCompleted = questionNumber <= completedQuestions;
              const isCurrent = questionNumber === currentQuestion;

              return (
                <div
                  key={index}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-medium
                    ${
                      isCurrent
                        ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                        : isCompleted
                        ? "border-green-500 bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                        : "border-gray-300 bg-gray-50 text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isCurrent ? (
                    questionNumber
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Status Text */}
          <div className="text-center text-sm text-gray-500">
            {completedQuestions === totalQuestions
              ? "All questions completed!"
              : currentQuestion === 1
              ? "Starting your interview..."
              : `${totalQuestions - completedQuestions} questions remaining`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
