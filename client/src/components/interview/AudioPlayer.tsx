"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { AudioPlayerState } from "@/types/interview";

interface AudioPlayerProps {
  audioState: AudioPlayerState;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  isEnabled?: boolean;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioState,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
  isEnabled = true,
  title = "Question Audio",
}) => {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage =
    audioState.duration > 0
      ? (audioState.currentTime / audioState.duration) * 100
      : 0;

  const handlePlayPause = () => {
    if (!isEnabled || !audioState.isLoaded) return;

    if (audioState.isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleRestart = () => {
    if (!isEnabled) return;
    onSeek(0);
  };

  const handleProgressChange = (value: number[]) => {
    if (!isEnabled || !audioState.isLoaded) return;
    const newTime = (value[0] / 100) * audioState.duration;
    onSeek(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0] / 100);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <Badge
              variant={audioState.isLoaded ? "default" : "secondary"}
              className={
                audioState.isLoaded ? "bg-green-100 text-green-800" : ""
              }
            >
              {audioState.isLoaded ? "Ready" : "Loading..."}
            </Badge>
          </div>

          {/* Error State */}
          {audioState.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{audioState.error}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <Button
              onClick={handlePlayPause}
              disabled={!isEnabled || !audioState.isLoaded}
              size="icon"
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
            >
              {audioState.isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </Button>

            {/* Restart Button */}
            <Button
              onClick={handleRestart}
              disabled={!isEnabled || !audioState.isLoaded}
              variant="outline"
              size="icon"
              className="w-10 h-10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            {/* Progress Bar */}
            <div className="flex-1 space-y-2">
              <Slider
                value={[progressPercentage]}
                onValueChange={handleProgressChange}
                disabled={!isEnabled || !audioState.isLoaded}
                max={100}
                step={0.1}
                className="w-full"
              />

              {/* Time Display */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatTime(audioState.currentTime)}</span>
                <span>{formatTime(audioState.duration)}</span>
              </div>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-2 min-w-[100px]">
              {audioState.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-gray-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-gray-400" />
              )}
              <Slider
                value={[audioState.volume * 100]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-16"
              />
            </div>
          </div>

          {/* Instructions */}
          {!audioState.error && (
            <p className="text-xs text-gray-500 text-center">
              {!audioState.isLoaded
                ? "Loading audio question..."
                : "Click play to listen to the interview question"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
