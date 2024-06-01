import { Box, Heading } from "@gluestack-ui/themed";
import React, { useCallback, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

type YoutubeCardProps = {
  video: {
    title: string;
    videoId: string;
    width?: any;
  };
};

const YoutubeCard = ({
  video: { title, videoId, width },
}: YoutubeCardProps): JSX.Element => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <Box w={"$80"} flex={1}>
      <Box>
        <YoutubePlayer
          height={180}
          play={playing}
          onChangeState={onStateChange}
          videoId={videoId}
        />
      </Box>
      <Box
        overflow="hidden"
        borderBottomWidth={2}
        flex={1}
        borderColor="#ff0000"
        bg={"$white"}
      >
        <Box height={"$full"} w={"$full"} p={"$4"}>
          <Heading size={"sm"}>{title}</Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default YoutubeCard;
