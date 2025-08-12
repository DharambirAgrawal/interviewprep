"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  InterviewSession,
  InterviewQuestion,
  InterviewResponse,
  AudioPlayerState,
} from "@/types/interview";
import { InterviewService } from "@/services/interview";

export const useInterviewSession = (sessionId: string) => {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<InterviewQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoaded: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const questionStartTime = useRef<Date | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    // Audio event listeners
    const handleLoadedData = () => {
      setAudioState((prev) => ({
        ...prev,
        isLoaded: true,
        duration: audio.duration || 0,
      }));
    };

    const handleTimeUpdate = () => {
      setAudioState((prev) => ({
        ...prev,
        currentTime: audio.currentTime || 0,
      }));
    };

    const handlePlay = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    };

    const handleEnded = () => {
      setAudioState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
      }));
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setAudioState((prev) => ({
        ...prev,
        error: "Failed to load audio",
        isLoaded: false,
      }));
    };

    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Load interview session
  useEffect(() => {
    const loadSession = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const sessionData = await InterviewService.getInterviewSession(
          sessionId
        );
        setSession(sessionData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load interview session"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      loadSession();
    }
  }, [sessionId]);

  // Load current question when session or question index changes
  useEffect(() => {
    const loadCurrentQuestion = async () => {
      if (!session) return;

      try {
        const question = await InterviewService.getNextQuestion(
          session.id,
          session.currentQuestionIndex
        );
        setCurrentQuestion(question);

        if (question?.audioUrl && audioRef.current) {
          const audioUrl = InterviewService.getAudioUrl(question.audioUrl);
          audioRef.current.src = audioUrl;
          setAudioState((prev) => ({
            ...prev,
            isLoaded: false,
            error: undefined,
          }));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load question"
        );
      }
    };

    loadCurrentQuestion();
  }, [session]);

  // Audio control functions
  const playAudio = useCallback(() => {
    if (audioRef.current && !audioState.isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
        setAudioState((prev) => ({
          ...prev,
          error: "Failed to play audio",
        }));
      });
    }
  }, [audioState.isPlaying]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current && audioState.isPlaying) {
      audioRef.current.pause();
    }
  }, [audioState.isPlaying]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
      setAudioState((prev) => ({ ...prev, volume }));
    }
  }, []);

  const seekTo = useCallback(
    (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(
          0,
          Math.min(audioState.duration, time)
        );
      }
    },
    [audioState.duration]
  );

  // Submit response and move to next question
  const submitResponseAndNext = useCallback(
    async (response: string, code?: string, language?: string) => {
      if (!session || !currentQuestion) return false;

      try {
        const timeSpent = questionStartTime.current
          ? Math.floor(
              (Date.now() - questionStartTime.current.getTime()) / 1000
            )
          : 0;

        const interviewResponse: Omit<InterviewResponse, "timestamp"> = {
          questionId: currentQuestion.id,
          response,
          code,
          language,
          timeSpent,
        };

        // Submit response
        const success = await InterviewService.submitResponse(
          session.id,
          interviewResponse
        );

        if (success) {
          // Update session with the response
          const updatedResponses = [
            ...session.responses,
            { ...interviewResponse, timestamp: new Date() },
          ];
          const nextQuestionIndex = session.currentQuestionIndex + 1;

          // Update local state
          setSession((prev) =>
            prev
              ? {
                  ...prev,
                  currentQuestionIndex: nextQuestionIndex,
                  responses: updatedResponses,
                  status:
                    nextQuestionIndex >= session.totalQuestions
                      ? "completed"
                      : "in-progress",
                }
              : null
          );

          // Reset question start time for next question
          questionStartTime.current = new Date();

          return true;
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to submit response"
        );
      }

      return false;
    },
    [session, currentQuestion]
  );

  // Start interview
  const startInterview = useCallback(async () => {
    if (!session) return false;

    try {
      const success = await InterviewService.updateSessionStatus(
        session.id,
        "in-progress"
      );
      if (success) {
        setSession((prev) =>
          prev
            ? { ...prev, status: "in-progress", startTime: new Date() }
            : null
        );
        questionStartTime.current = new Date();
        return true;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start interview"
      );
    }

    return false;
  }, [session]);

  // End interview
  const endInterview = useCallback(async () => {
    if (!session) return false;

    try {
      const success = await InterviewService.updateSessionStatus(
        session.id,
        "completed"
      );
      if (success) {
        setSession((prev) =>
          prev ? { ...prev, status: "completed", endTime: new Date() } : null
        );
        return true;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to end interview");
    }

    return false;
  }, [session]);

  // Check if interview is completed
  const isCompleted = session
    ? session.currentQuestionIndex >= session.totalQuestions
    : false;

  // Check if there's a next question
  const hasNextQuestion = session
    ? session.currentQuestionIndex < session.totalQuestions - 1
    : false;

  return {
    // State
    session,
    currentQuestion,
    isLoading,
    error,
    audioState,
    isCompleted,
    hasNextQuestion,

    // Actions
    playAudio,
    pauseAudio,
    setVolume,
    seekTo,
    submitResponseAndNext,
    startInterview,
    endInterview,

    // Utils
    clearError: () => setError(null),
  };
};
