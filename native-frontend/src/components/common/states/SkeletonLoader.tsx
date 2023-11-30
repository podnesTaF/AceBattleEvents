import { Box } from "@gluestack-ui/themed";
import React, { ReactNode } from "react";
import { ActivityIndicator } from "react-native";

interface SkeletonLoaderProps<T> {
  data?: T;
  wrapperStyle?: { [key: string]: any };
  color?: string;
  children: (data: T) => ReactNode;
}

const SkeletonLoader = <T extends {}>({
  data,
  children,
  wrapperStyle,
  color,
}: SkeletonLoaderProps<T>): JSX.Element => {
  if (!data) {
    return (
      <Box
        p={"$5"}
        justifyContent="center"
        alignItems="center"
        {...wrapperStyle}
      >
        <ActivityIndicator size="large" color={color || "#ccc"} />
      </Box>
    );
  }

  return <>{children(data)}</>;
};

export default SkeletonLoader;
