// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
// import { Mic, MicOff } from "lucide-react";
// import React, { useState } from "react";
// import { Badge } from "@/components/ui/badge";

// const Microphone = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button
//           variant={isMuted ? "destructive" : "ghost"}
//           size="icon"
//           onClick={() => setIsMuted(!isMuted)}
//           className={`w-11 h-11 text-white ${
//             isMuted
//               ? "bg-red-600 hover:bg-red-700"
//               : "bg-gray-700 hover:bg-gray-600"
//           } rounded-full shadow-md`}
//         >
//           {isMuted ? (
//             <MicOff className="w-5 h-5" />
//           ) : (
//             <Mic className="w-5 h-5" />
//           )}
//         </Button>
//       </TooltipTrigger>
//       <TooltipContent side="top">
//         <p>{isMuted ? "Unmute" : "Mute"}</p>
//       </TooltipContent>
//       {/* Mute Indicator */}
//       {isMuted && (
//         <div className="absolute bottom-3 left-3 z-10">
//           <Badge
//             variant="outline"
//             className="bg-red-900/60 text-red-200 border-red-500/30"
//           >
//             <MicOff className="w-3 h-3 mr-1" /> Muted
//           </Badge>
//         </div>
//       )}
//     </Tooltip>
//   );
// };

// export default Microphone;
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

const Microphone = () => {
  const [isMuted, setIsMuted] = useState(true); // default to muted
  const [micStream, setMicStream] = useState<MediaStream | null>(null);

  const handleMicToggle = async () => {
    if (isMuted) {
      // Request microphone access
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicStream(stream);
        setIsMuted(false);
      } catch (error) {
        console.error("Failed to access microphone:", error);
      }
    } else {
      // Stop microphone stream
      if (micStream) {
        micStream.getTracks().forEach((track) => track.stop());
        setMicStream(null);
      }
      setIsMuted(true);
    }
  };

  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isMuted ? "destructive" : "ghost"}
            size="icon"
            onClick={handleMicToggle}
            className={`w-11 h-11 text-white ${
              isMuted
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-700 hover:bg-gray-600"
            } rounded-full shadow-md`}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{isMuted ? "Unmute" : "Mute"}</p>
        </TooltipContent>
      </Tooltip>

      {/* Mute Indicator */}
    </div>
  );
};

export default Microphone;
