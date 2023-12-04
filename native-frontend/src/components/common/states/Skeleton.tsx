import { Box } from "@gluestack-ui/themed";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface SkeletonProps {
  width?: number;
  height?: number;
  color?: any;
}

const Skeleton = ({ width, height, color }: SkeletonProps): JSX.Element => {
  const shimmerWidth = 100; // Width of the shimmer effect
  const shimmerAnim = useRef(new Animated.Value(-shimmerWidth)).current; // Starts off-screen

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: width || 300 + shimmerWidth, // Assuming wrapperStyle has a width
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim, width]);

  return (
    <View style={[styles.skeletonWrapper, { height: height || "auto" }]}>
      <Box h={height || "auto"} bgColor={color || "#f1f1f1"}></Box>
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
};

const styles = StyleSheet.create({
  skeletonWrapper: {
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.4)",
    top: 0,
  },
});

export default Skeleton;
