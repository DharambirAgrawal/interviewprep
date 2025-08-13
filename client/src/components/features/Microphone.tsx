// // export default Microphone;
// import React, { useState, useRef } from "react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
// import { Mic, MicOff } from "lucide-react";

// const Microphone = () => {
//   const [isMuted, setIsMuted] = useState(true);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   const sendAudioChunk = async (chunk: Blob) => {
//     const formData = new FormData();
//     formData.append("audio", chunk, "chunk.webm");

//     const res = await fetch("/api/audio-stream", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     console.log("Transcription result:", data.text || data.error);
//   };
// const handleMicToggle = async () => {
//   if (isMuted) {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const fullBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//         await sendAudioChunk(fullBlob);
//       };

//       mediaRecorderRef.current = mediaRecorder;
//       mediaRecorder.start(); // continuous recording

//       setIsMuted(false);
//     } catch (error) {
//       console.error("Mic access error:", error);
//     }
//   } else {
//     mediaRecorderRef.current?.stop();
//     mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
//     mediaRecorderRef.current = null;
//     setIsMuted(true);
//   }
// };

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
//           <p>{isMuted ? "Start Listening" : "Stop Listening"}</p>
//         </TooltipContent>
//       </Tooltip>
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
  const [text, setText] = useState<string>("");

  const sendAudioChunk = async (chunk: Blob) => {
    const formData = new FormData();
    formData.append("audio", chunk, "chunk.webm");

    try {
      const response = await fetch("/api/audio-stream", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setText((prev) => prev + data.text);
      }
      console.log("Transcription result:", data.text || data.error);
    } catch (error) {
      console.error("Error sending audio chunk:", error);
    }
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
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 1000) {
            // skip silence or tiny chunks
            audioChunksRef.current.push(event.data);
          } else {
            console.log("Silent chunk skipped");
          }
        };

        mediaRecorder.onstop = async () => {
          const fullBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          if (fullBlob.size > 1000) {
            await sendAudioChunk(fullBlob);
          } else {
            console.log("No meaningful audio to send");
          }

          audioChunksRef.current = [];
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start(); // record continuously
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
