"use client";

import {
  PauseCircle,
  PlayCircle,
  Replay,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";

export const VideoHeader = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Video starts playing
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <header
      className="w-full flex justify-center items-center flex-col shadow-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        className="w-full sm:h-[640px] xl:h-[800px] xl:max-h-[80vh] object-cover object-center top-0 left-0 z-[-1]"
      >
        <source src="/video/intro.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute top-0 left-0 w-full h-full 2xl:bg-black/50 flex justify-end items-end p-2 gap-4`}
      >
        <IconButton
          onClick={restartVideo}
          className={`opacity-70 transition-all visible ${
            isHovered ? "md:visible" : "md:invisible"
          }`}
        >
          <Replay className="text-gray-200 text-3xl" />
        </IconButton>
        <IconButton
          onClick={togglePlay}
          className={`opacity-70 transition-all visible ${
            isHovered ? "md:visible" : "md:invisible"
          }`}
        >
          {isPlaying ? (
            <PauseCircle className="text-gray-200 text-3xl" />
          ) : (
            <PlayCircle className="text-gray-200 text-3xl" />
          )}
        </IconButton>
        <IconButton
          onClick={toggleMute}
          className={`opacity-70 transition-all visible ${
            isHovered ? "md:visible" : "md:invisible"
          }`}
        >
          {isMuted ? (
            <VolumeOff className="text-white text-3xl" />
          ) : (
            <VolumeUp className="text-white text-3xl" />
          )}
        </IconButton>
      </div>
    </header>
  );
};

export default VideoHeader;
