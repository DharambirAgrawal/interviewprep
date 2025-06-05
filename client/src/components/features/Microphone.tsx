// // export default Microphone;
// import React, { useState } from "react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
// import { Mic, MicOff } from "lucide-react";

// const Microphone = () => {
//   const [isMuted, setIsMuted] = useState(true); // default to muted
//   const [micStream, setMicStream] = useState<MediaStream | null>(null);

//   const handleMicToggle = async () => {
//     if (isMuted) {
//       // Request microphone access
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         setMicStream(stream);
//         setIsMuted(false);
//       } catch (error) {
//         console.error("Failed to access microphone:", error);
//       }
//     } else {
//       // Stop microphone stream
//       if (micStream) {
//         micStream.getTracks().forEach((track) => track.stop());
//         setMicStream(null);
//       }
//       setIsMuted(true);
//     }
//   };

//   return (
//     <div className="relative">
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button
//             variant={isMuted ? "destructive" : "ghost"}
//             size="icon"
//             onClick={handleMicToggle}
//             className={`w-11 h-11 text-white ${
//               isMuted
//                 ? "bg-red-600 hover:bg-red-700"
//                 : "bg-gray-700 hover:bg-gray-600"
//             } rounded-full shadow-md`}
//           >
//             {isMuted ? (
//               <MicOff className="w-5 h-5" />
//             ) : (
//               <Mic className="w-5 h-5" />
//             )}
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent side="top">
//           <p>{isMuted ? "Unmute" : "Mute"}</p>
//         </TooltipContent>
//       </Tooltip>

//       {/* Mute Indicator */}
//     </div>
//   );
// };

// export default Microphone;
import React, { useState, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

const Microphone = () => {
  const [isMuted, setIsMuted] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const sendAudioChunk = async (chunk: Blob) => {
    const formData = new FormData();
    formData.append("audio", chunk, "chunk.webm");

    await fetch("/api/audio-stream", {
      method: "POST",
      body: formData,
    });
  };

  const handleMicToggle = async () => {
    if (isMuted) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            sendAudioChunk(event.data);
          }
        };

        mediaRecorder.start(3000); // send every 1s

        mediaRecorderRef.current = mediaRecorder;
        setIsMuted(false);
      } catch (error) {
        console.error("Mic access error:", error);
      }
    } else {
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current?.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorderRef.current = null;
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
          <p>{isMuted ? "Start Listening" : "Stop Listening"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default Microphone;
