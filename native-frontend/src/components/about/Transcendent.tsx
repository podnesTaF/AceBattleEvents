import { Box, Heading, Image, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import React from "react";
import ConceptWrapper from "./ConceptWrapper";

const points = [
  "Based on the city clubs approach rather than nations.",
  "This is the modern way of bringing up the traditional sports.",
  "Teams are formed with athletes of different nations to represent one city.",
  "Ongoing competitions between the AB city teams.",
];

const Transcendent = () => {
  const { isSmallScreen } = useScreenSize();
  return (
    <ConceptWrapper title={"Transcendent"}>
      <Box w={"$full"} height={isSmallScreen ? 200 : 240}>
        <Image
          source={require("@Assets/images/transcendent.png")}
          size="full"
          height={isSmallScreen ? 200 : 260}
          role={"img"}
          objectFit="contain"
          alt={"slide image"}
        />
      </Box>
      <Box pb={"$1/6"}>
        <Heading size={isSmallScreen ? "md" : "lg"} color="#ff0000">
          BRINGING TEAM BATTLES TO INDIVIDUAL SPORT
        </Heading>
        <VStack space="sm">
          {points.map((p, i) => (
            <Heading size="sm" key={i}>
              {p}
            </Heading>
          ))}
        </VStack>
      </Box>
    </ConceptWrapper>
  );
};

export default Transcendent;
