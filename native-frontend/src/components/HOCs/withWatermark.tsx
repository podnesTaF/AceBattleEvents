import { Image } from "@gluestack-ui/themed";
import React from "react";

function withWatermarkBg(Component: React.FC) {
  return function (props: any) {
    return (
      <>
        <Component {...props} />
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
      </>
    );
  };
}

export default withWatermarkBg;
