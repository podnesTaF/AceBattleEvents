import { Box, Image } from "@gluestack-ui/themed";
import { scaleSize } from "@lib/utils";
import React from "react";

const getWidth = (height: number) => {
  return height * 12;
};

const LogoTitle = ({ height }: any) => {
  const adaptedHeight = scaleSize(height || 20);
  return (
    <Box
      width={getWidth(adaptedHeight)}
      justifyContent="center"
      alignItems="center"
      height={adaptedHeight}
    >
      <Image
        role={"img"}
        size={"full"}
        objectFit="contain"
        source={{
          uri: "https://storage.googleapis.com/abe_cloud_storage/image/large/dbd73a85-bb5c-484d-a05c-8cb73d5b55cb.png",
        }}
        alt="logo"
      />
    </Box>
  );
};

export default LogoTitle;
