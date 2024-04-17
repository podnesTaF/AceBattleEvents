import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Heading, Image } from "@gluestack-ui/themed";
import React from "react";

interface Props {
  title: string;
  icon?: string;
  position?: string;
  width?: any;
}

const TitleRect: React.FC<Props> = ({
  title,
  icon,
  width,
  position = "top",
}) => {
  return (
    <Box
      position="absolute"
      bottom={position === "bottom" ? 0 : undefined}
      top={position === "top" ? 0 : undefined}
      left={0}
      w={width || "$48"}
      height={"$8"}
      justifyContent="center"
      alignItems="center"
    >
      <Image
        role={"img"}
        alt={"vector"}
        source={require("@Assets/images/title-rect.png")}
        size="full"
        position="absolute"
        zIndex={1}
      />
      <HStack space={"sm"}>
        <Heading zIndex={2} size={"md"} color={"$white"}>
          {title}
        </Heading>
        <Ionicons name={icon as any} color="white" size={16} />
      </HStack>
    </Box>
  );
};

export default TitleRect;
