import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton, Snackbar } from "@mui/material";
import React, { useState } from "react";
import YouTube from "react-youtube";

interface Props {
  videoId: string;
  title: string;
}

const VideoItem: React.FC<Props> = ({ videoId, title }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [statusAlert, setStatusAlert] = useState({
    message: "",
    isOpen: false,
  });
  const youtubeRef = React.useRef<YouTube>(null);

  const handleFullScreenChange = () => {
    if (youtubeRef.current && isFullScreen) {
      youtubeRef.current.internalPlayer.pauseVideo();
    }
    setIsFullScreen(!isFullScreen);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoId}`);
    setStatusAlert({
      message: "Link copied",
      isOpen: true,
    });
  };

  const opts = {
    playerVars: {
      autoplay: 0, // Autoplay off
      controls: 1, // Hide YouTube controls
      modestbranding: 1, // Hide YouTube logo
      rel: 0, // Hide related videos
      showinfo: 0, // Hide video title
    },
    origin: "https://www.aba.run",
  };
  return (
    <div className={`video-section w-full ${isFullScreen ? "fullscreen" : ""}`}>
      {isFullScreen ? (
        <div className="video-wrapper">
          <YouTube
            ref={youtubeRef}
            className="h-full w-full"
            iframeClassName="fullscreen-iframe"
            videoId={videoId}
            opts={opts}
            onReady={(e) => e.target.playVideo()}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 100,
              bgcolor: "white",
              "&:hover": {
                bgcolor: "white",
                opacity: 0.7,
              },
            }}
            size="large"
            onClick={handleFullScreenChange}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
      ) : (
        <div>
          <YouTube
            ref={youtubeRef}
            onPlay={handleFullScreenChange}
            iframeClassName="iframe-video"
            videoId={videoId}
            opts={opts}
          />
          <div className="min-h-[120px] relative">
            <h2 className="text-xl font-semibold p-4">{title}</h2>
            <IconButton
              onClick={copyLink}
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      )}
      <Snackbar
        open={statusAlert.isOpen}
        autoHideDuration={2000}
        onClose={() => setStatusAlert({ message: "", isOpen: false })}
        message={statusAlert.message}
      />
    </div>
  );
};

export default VideoItem;
