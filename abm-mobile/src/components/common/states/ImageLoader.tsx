import { Box, Center } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

type Props = {
  isLoading: boolean;
  error?: any;
  children?: React.ReactNode;
};

const ImageLoader = ({ isLoading, error, children }: Props): JSX.Element => {
  const [fadeAnim] = useState(new Animated.Value(0.5));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Box>
          <Animated.Image
            source={require("@Assets/images/runners.png")}
            style={{
              width: 120,
              height: 160,
              objectFit: "contain",
              opacity: fadeAnim,
            }}
            role={"img"}
            alt={"loading..."}
          />
        </Box>
      </Center>
    );
  }

  return <>{children}</>;
};

export default ImageLoader;
