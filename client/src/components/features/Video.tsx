"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Optional, from shadcn/ui

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopCamera = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.srcObject) {
      const tracks = (videoElement.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoElement.srcObject = null;
      setStreaming(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-md shadow-md max-w-md mx-auto">
      <video
        ref={videoRef}
        className="w-full max-w-sm rounded-md bg-black"
        autoPlay
        playsInline
        muted
      />
      <div className="flex gap-4">
        <Button onClick={startCamera} disabled={streaming}>
          Start Camera
        </Button>
        <Button
          onClick={stopCamera}
          variant="destructive"
          disabled={!streaming}
        >
          Stop Camera
        </Button>
      </div>
    </div>
  );
};

export default Video;
