"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  MicOff,
  Settings,
  Users,
  Clock,
  Layout,
  CheckCircle,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ControlPanel from "./ControlPanel";
import { QuestionDisplay } from "./QuestionDisplay";
import { useInterviewSession } from "@/hooks/useInterviewSession";

const VideoCallInterface = () => {
  const params = useParams();
  const sessionId = params?.id as string;

  const {
    session,
    currentQuestion,
    isLoading,
    error,
    audioState,
    isCompleted,
    hasNextQuestion,
    playAudio,
    pauseAudio,
    setVolume,
    seekTo,
    submitResponseAndNext,
    startInterview,
    endInterview,
  } = useInterviewSession(sessionId);

  const [viewMode, setViewMode] = useState("split");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const participants = [
    {
      id: 1,
      name: session?.participant?.name || "Candidate",
      initials: session?.participant?.name?.charAt(0) || "C",
      isPresenting: false,
      isMuted: false,
      role: "Candidate",
    },
    {
      id: 2,
      name: session?.interviewer?.name || "AI Interviewer",
      initials: "AI",
      isPresenting: false,
      isMuted: true,
      role: "Interviewer",
    },
  ];

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const toggleViewMode = () => {
    const modes = ["split", "userFocus", "interviewerFocus"];
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  const handleSubmitAndNext = async (
    response: string,
    code?: string,
    language?: string
  ) => {
    setIsSubmitting(true);
    try {
      const success = await submitResponseAndNext(response, code, language);
      return success;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartInterview = async () => {
    await startInterview();
  };

  const handleEndInterview = async () => {
    await endInterview();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading interview session...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !session) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {error || "Failed to load interview session"}
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Waiting to start
  if (session.status === "waiting") {
    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className="bg-blue-600/10 text-blue-500 border-blue-500/20 font-medium"
            >
              {session.title}
            </Badge>
            <div className="text-white/80 text-sm">
              <span>{currentTime}</span>
              <span className="mx-2">|</span>
              <span>Session: {session.id.slice(-8)}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">
                Ready to Begin Interview?
              </CardTitle>
              <p className="text-gray-600">
                This interview session contains {session.totalQuestions}{" "}
                questions covering various topics. Each question will be
                presented with audio instructions.
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">Questions</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {session.totalQuestions}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900">Format</h3>
                  <p className="text-sm text-green-600">Audio + Interactive</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-900">Type</h3>
                  <p className="text-sm text-purple-600">AI-Powered</p>
                </div>
              </div>

              <Button
                onClick={handleStartInterview}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Interview completed
  if (isCompleted || session.status === "completed") {
    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className="bg-green-600/10 text-green-500 border-green-500/20 font-medium"
            >
              Interview Completed
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl mb-2">
                Interview Completed!
              </CardTitle>
              <p className="text-gray-600">
                Thank you for completing the interview. Your responses have been
                recorded and will be reviewed.
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">
                    Questions Answered
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {session.responses.length} / {session.totalQuestions}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900">Duration</h3>
                  <p className="text-sm text-green-600">
                    {session.startTime && session.endTime
                      ? `${Math.round(
                          (session.endTime.getTime() -
                            session.startTime.getTime()) /
                            60000
                        )} minutes`
                      : "Completed"}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => (window.location.href = "/dashboard")}
                size="lg"
                className="px-8"
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Active interview with question
  if (currentQuestion) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col font-sans">
        {/* Interview Info Panel - Top */}
        <div className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className="bg-orange-600/10 text-orange-500 border-orange-500/20 font-medium"
            >
              {session.title}
            </Badge>
            <div className="text-white/80 text-sm">
              <span>{currentTime}</span>
              <span className="mx-2">|</span>
              <span>Session: {session.id.slice(-8)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/20 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Question {session.currentQuestionIndex + 1} of{" "}
              {session.totalQuestions}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-gray-700/50"
            >
              <Users className="w-3 h-3" />
              {participants.length}
            </Badge>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Video Panel - Left Side */}
            <div className="w-1/3 flex flex-col">
              {/* Candidate Video */}
              <div className="flex-1 relative bg-gradient-to-br from-orange-800 via-orange-700 to-orange-900">
                <div className="absolute top-3 left-3 z-10">
                  <Badge
                    variant="outline"
                    className="bg-black/40 text-white border-white/20"
                  >
                    {participants[0].role}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 bg-orange-600 shadow-lg shadow-orange-900/30">
                      <AvatarFallback className="text-2xl font-semibold text-white bg-orange-600">
                        {participants[0].initials}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-white text-lg font-medium tracking-wide">
                      {participants[0].name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Interviewer Video */}
              <div className="flex-1 relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
                <div className="absolute top-3 left-3 z-10">
                  <Badge
                    variant="outline"
                    className="bg-black/40 text-white border-white/20"
                  >
                    {participants[1].role}
                  </Badge>
                </div>
                {participants[1].isMuted && (
                  <div className="absolute bottom-3 left-3 z-10">
                    <Badge
                      variant="outline"
                      className="bg-red-900/60 text-red-200 border-red-500/30"
                    >
                      <MicOff className="w-3 h-3 mr-1" /> Muted
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 bg-blue-700 shadow-lg shadow-blue-900/30">
                      <AvatarFallback className="text-2xl font-semibold text-white bg-blue-700">
                        {participants[1].initials}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-white text-lg font-medium tracking-wide">
                      {participants[1].name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Panel - Right Side */}
            <div className="flex-1 bg-white dark:bg-gray-950 p-6 overflow-auto">
              <QuestionDisplay
                question={currentQuestion}
                questionNumber={session.currentQuestionIndex + 1}
                totalQuestions={session.totalQuestions}
                audioState={audioState}
                onPlayAudio={playAudio}
                onPauseAudio={pauseAudio}
                onSeekAudio={seekTo}
                onVolumeChange={setVolume}
                onSubmitAndNext={handleSubmitAndNext}
                isSubmitting={isSubmitting}
                hasNextQuestion={hasNextQuestion}
              />
            </div>
          </div>
        </div>

        {/* Layout Controls - Top Right of Video Panel */}
        <div className="absolute top-16 left-4 z-10 flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleViewMode}
                className="text-white/80 hover:bg-white/10 h-8 w-8 rounded-full bg-gray-800/50"
              >
                <Layout className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Change View ({viewMode})</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:bg-white/10 h-8 w-8 rounded-full bg-gray-800/50"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Bottom Control Panel */}
        <ControlPanel />
      </div>
    );
  }

  // No current question available
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>No Questions Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            There are no questions available for this interview session.
          </p>
          <Button onClick={() => (window.location.href = "/dashboard")}>
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoCallInterface;
