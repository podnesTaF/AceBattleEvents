import { Box, Image } from "@gluestack-ui/themed";
import React from "react";

function withWatermarkBg(Component: React.FC, bgColor?: string) {
  return function (props: any) {
    return (
      <>
        <Component {...props} />
        {bgColor ? (
          <Box
            position="absolute"
            width={"100%"}
            bgColor={bgColor}
            height="100%"
            left={0}
            bottom={0}
            top={0}
            right={0}
            zIndex={-10}
          />
        ) : (
          <Image
            source={require("@Assets/images/main-bg.png")}
            role={"img"}
            alt="bg"
            position="absolute"
            size={"full"}
            left={0}
            bottom={0}
            top={0}
            right={0}
            zIndex={-10}
          />
        )}
      </>
    );
  };
}

export default withWatermarkBg;
