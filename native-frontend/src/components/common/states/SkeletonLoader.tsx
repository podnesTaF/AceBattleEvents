import { Box } from "@gluestack-ui/themed";
import React, { ReactNode, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface SkeletonLoaderProps<T> {
  data?: T;
  wrapperStyle?: { [key: string]: any };
  color?: string;
  children: (data: T) => ReactNode | ReactNode;
  height?: number;
  isLoading?: boolean;
}

const SkeletonLoader = <T extends {}>({
  data,
  children,
  wrapperStyle,
  isLoading,
  color,
  height,
}: SkeletonLoaderProps<T>): JSX.Element => {
  const shimmerWidth = 100; // Width of the shimmer effect
  const shimmerAnim = useRef(new Animated.Value(-shimmerWidth)).current; // Starts off-screen

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: wrapperStyle?.width || 300 + shimmerWidth, // Assuming wrapperStyle has a width
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim, wrapperStyle]);

  if (isLoading || !data) {
    return (
      <View style={[styles.skeletonWrapper, wrapperStyle]}>
        <Box h={height || "auto"} bgColor="#eee"></Box>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerAnim }],
              width: shimmerWidth,
            },
          ]}
        />
      </View>
    );
  }

  return <>{typeof children === "function" ? children(data) : children}</>;
};

const styles = StyleSheet.create({
  skeletonWrapper: {
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    top: 0,
  },
});

export default SkeletonLoader;
