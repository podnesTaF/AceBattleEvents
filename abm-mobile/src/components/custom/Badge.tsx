import { Box, Heading } from "@gluestack-ui/themed";
import React from "react";
import { Pressable } from "react-native";

const Badge = ({ text, isActive, onPress, ...props }: any) => {
  return (
    <Pressable onPress={() => onPress && onPress(text)}>
      {({ pressed }) => (
        <Box
          {...props}
          bgColor={isActive ? "$red500" : "$coolGray400"}
          rounded={"$xl"}
          softShadow={pressed ? "1" : undefined}
        >
          <Heading color={"$white"} size={"sm"}>
            {text}
          </Heading>
        </Box>
      )}
    </Pressable>
  );
};

export default Badge;
