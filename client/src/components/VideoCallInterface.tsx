"use client";
import React, { useState } from "react";
import { MicOff, Settings, Users, Clock, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ControlPanel from "./ControlPanel";

const VideoCallInterface = () => {
  const [viewMode, setViewMode] = useState("split"); // split, userFocus, interviewerFocus

  const participants = [
    {
      id: 1,
      name: "Dharambir Agrawal",
      initials: "D",
      isPresenting: false,
      isMuted: false,
      role: "Candidate",
    },
    {
      id: 2,
      name: "John Smith",
      initials: "JS",
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

  // Timer state
  const [interviewTime, setInterviewTime] = useState(45); // 45 minutes
  const formattedTime = `${Math.floor(interviewTime)}:${String(
    Math.round((interviewTime % 1) * 60)
  ).padStart(2, "0")}`;

  // Helper function to toggle view mode
  const toggleViewMode = () => {
    const modes = ["split", "userFocus", "interviewerFocus"];
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col font-sans">
      {/* Interview Info Panel - Top */}
      <div className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Badge
            variant="outline"
            className="bg-orange-600/10 text-orange-500 border-orange-500/20 font-medium"
          >
            Technical Interview
          </Badge>
          <div className="text-white/80 text-sm">
            <span>{currentTime}</span>
            <span className="mx-2">|</span>
            <span>Session: qez-cimp-qum</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/20 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formattedTime}
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

      {/* Main Video Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-950 flex">
          {/* Split View Container */}
          <div
            className={`flex w-full h-full ${
              viewMode === "split" ? "flex-row" : "flex-col"
            }`}
          >
            {/* Candidate Video Panel */}
            <div
              className={`
                relative bg-gradient-to-br from-orange-800 via-orange-700 to-orange-900 
                ${
                  viewMode === "split"
                    ? "w-1/2"
                    : viewMode === "userFocus"
                    ? "w-full h-full"
                    : "w-full h-1/4"
                }
                ${
                  viewMode !== "split" && viewMode !== "userFocus"
                    ? "order-2"
                    : ""
                }
                transition-all duration-300
              `}
            >
              {/* Participant Badge */}
              <div className="absolute top-3 left-3 z-10">
                <Badge
                  variant="outline"
                  className="bg-black/40 text-white border-white/20"
                >
                  {participants[0].role}
                </Badge>
              </div>

              {/* Participant Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 bg-orange-600 shadow-lg shadow-orange-900/30">
                    <AvatarFallback className="text-xl md:text-2xl lg:text-3xl font-semibold text-white bg-orange-600">
                      {participants[0].initials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-white text-lg md:text-xl font-medium tracking-wide">
                    {participants[0].name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Interviewer Video Panel */}
            <div
              className={`
                relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 
                ${
                  viewMode === "split"
                    ? "w-1/2"
                    : viewMode === "interviewerFocus"
                    ? "w-full h-full"
                    : "w-full h-1/4"
                }
                ${
                  viewMode !== "split" && viewMode !== "interviewerFocus"
                    ? "order-1"
                    : ""
                }
                transition-all duration-300
              `}
            >
              {/* Participant Badge */}
              <div className="absolute top-3 left-3 z-10">
                <Badge
                  variant="outline"
                  className="bg-black/40 text-white border-white/20"
                >
                  {participants[1].role}
                </Badge>
              </div>

              {/* Mute Indicator */}
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

              {/* Participant Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 bg-blue-700 shadow-lg shadow-blue-900/30">
                    <AvatarFallback className="text-xl md:text-2xl lg:text-3xl font-semibold text-white bg-blue-700">
                      {participants[1].initials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-white text-lg md:text-xl font-medium tracking-wide">
                    {participants[1].name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Controls - Top Right */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
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
      </div>

      {/* Bottom Control Panel */}
      <ControlPanel />
    </div>
  );
};

export default VideoCallInterface;
