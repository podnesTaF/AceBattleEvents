import { PauseCircle, PlayCircle, Replay } from "@mui/icons-material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";

const VideoHeader = () => {
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
        <source src="/video/intro-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black/50 flex justify-end items-end p-2 gap-4`}
      >
        <IconButton
          onClick={restartVideo}
          className={`opacity-70`}
          style={{ visibility: isHovered ? "visible" : "hidden" }}
        >
          <Replay className="text-white text-3xl" />
        </IconButton>
        <IconButton
          onClick={togglePlay}
          className={`opacity-70`}
          style={{ visibility: isHovered ? "visible" : "hidden" }}
        >
          {isPlaying ? (
            <PauseCircle className="text-white text-3xl" />
          ) : (
            <PlayCircle className="text-white text-3xl" />
          )}
        </IconButton>
        <IconButton
          style={{ visibility: isHovered ? "visible" : "hidden" }}
          onClick={toggleMute}
          className="opacity-70"
        >
          {isMuted ? (
            <VolumeOffIcon className="text-white text-3xl" />
          ) : (
            <VolumeUpIcon className="text-white text-3xl" />
          )}
        </IconButton>
      </div>
    </header>
  );
};

export default VideoHeader;
