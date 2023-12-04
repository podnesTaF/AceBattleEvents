import React from "react";
import { Animated } from "react-native";

interface BoxSkeletonProps {
  width?: any;
  height?: any;
  borderRadius?: number;
  color?: any;
  style?: {
    [key: string]: any;
  };
}

const BoxSkeleton = ({
  width,
  height,
  borderRadius = 0,
  color = "#E1E9EE",
  style,
}: BoxSkeletonProps): JSX.Element => {
  const animatedValue = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [color, "#F2F8FC"],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: interpolatedColor,
        },
        style,
      ]}
    />
  );
};

export default BoxSkeleton;
