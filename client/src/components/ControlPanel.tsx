import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import MicroPhone from "./features/Microphone";

import {
  Video,
  VideoOff,
  PhoneOff,
  MoreHorizontal,
  Share2,
  Code,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeEditor from "./CodeEditor";

const ControlPanel = () => {
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);
  return (
    <div className="relative z-20 py-6 mb-2">
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 bg-gray-800/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-700 flex items-center space-x-4">
        {/* Microphone */}
        <MicroPhone />

        {/* Video */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isVideoOff ? "destructive" : "ghost"}
              size="icon"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-11 h-11 text-white ${
                isVideoOff
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-700 hover:bg-gray-600"
              } rounded-full shadow-md`}
            >
              {isVideoOff ? (
                <VideoOff className="w-5 h-5" />
              ) : (
                <Video className="w-5 h-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{isVideoOff ? "Start Video" : "Stop Video"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Screen Share */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isScreenSharing ? "default" : "ghost"}
              size="icon"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`w-11 h-11 text-white ${
                isScreenSharing
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-700 hover:bg-gray-600"
              } rounded-full shadow-md`}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{isScreenSharing ? "Stop Sharing" : "Share Screen"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Code Editor */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isCodeEditorOpen ? "default" : "ghost"}
              size="icon"
              onClick={() => setIsCodeEditorOpen(!isCodeEditorOpen)}
              className={`w-11 h-11 text-white ${
                isCodeEditorOpen
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-700 hover:bg-gray-600"
              } rounded-full shadow-md`}
            >
              <Code className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{isCodeEditorOpen ? "Close Editor" : "Open Code Editor"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Chat */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-11 h-11 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Chat</p>
          </TooltipContent>
        </Tooltip>

        {/* More Options */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-11 h-11 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>More Options</p>
          </TooltipContent>
        </Tooltip>

        {/* End Call */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="w-11 h-11 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md"
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>End Call</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Code Editor Panel (mockup) - conditionally rendered */}
      {isCodeEditorOpen && (
        <CodeEditor setIsCodeEditorOpen={setIsCodeEditorOpen} />
      )}
    </div>
  );
};

export default ControlPanel;
