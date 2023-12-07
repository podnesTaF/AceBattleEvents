import { Box, HStack, Heading, Pressable, Spinner } from "@gluestack-ui/themed";
import React from "react";

interface AbmButtonProps {
  variant?: "redFirst" | "blackFirst";
  title: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  onPress: () => void;
}

const AbmButton = ({
  variant = "blackFirst",
  title,
  isLoading,
  size = "md",
  onPress,
}: AbmButtonProps): JSX.Element => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }: { pressed: boolean }) => (
        <Box>
          <Box
            zIndex={2}
            borderRadius={"$3xl"}
            borderWidth={2}
            alignItems="center"
            bgColor={"$white"}
            top={pressed ? "-$1" : 0}
            left={pressed ? "-$1" : 0}
            borderColor={variant === "redFirst" ? "$black" : "#ff0000"}
            px={size === "sm" ? "$2" : size === "lg" ? "$8" : "$4"}
            py={size === "sm" ? "$1" : size === "lg" ? "$4" : "$2"}
          >
            <HStack space={"sm"} alignItems="center">
              {isLoading && <Spinner size={"small"} />}
              <Heading size={size} color={"$black"}>
                {title}
              </Heading>
            </HStack>
          </Box>
          <Box
            zIndex={0}
            borderRadius={"$3xl"}
            alignItems="center"
            w={"$full"}
            height={"$full"}
            position="absolute"
            top={"-$1"}
            left={"-$1"}
            bgColor={variant === "redFirst" ? "#ff0000" : "$black"}
            px={size === "sm" ? "$2" : size === "lg" ? "$8" : "$4"}
            py={size === "sm" ? "$1" : size === "lg" ? "$4" : "$2"}
          ></Box>
        </Box>
      )}
    </Pressable>
  );
};

export default AbmButton;
