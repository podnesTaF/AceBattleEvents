import { Box, Heading } from "@gluestack-ui/themed";
import React, { useCallback, useState } from "react";

type YoutubeCardProps = {
  title: string;
  videoId: string;
  width?: any;
};

const YoutubeCard = ({
  title,
  videoId,
  width,
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
    <Box width={250}>
      <Box flex={1}></Box>
      <Box
        flex={1}
        p={"$3"}
        bg={"$white"}
        borderBottomWidth={2}
        borderColor="#ff0000"
      >
        <Heading size={"sm"}>{title}</Heading>
      </Box>
    </Box>
  );
};

export default YoutubeCard;
