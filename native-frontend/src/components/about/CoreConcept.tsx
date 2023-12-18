import { explanations, infoCards } from "@Constants/info-contents";
import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import React from "react";
import ConceptWrapper from "./ConceptWrapper";

const CoreConcept = () => {
  const { isSmallScreen } = useScreenSize();
  return (
    <ConceptWrapper title={"Core Concept"}>
      <HStack pl={"$10"} flexWrap={"wrap"} mx={"$4"} space={"md"}>
        {infoCards.map((inf, i) => (
          <VStack w={"$24"} key={i}>
            <Heading
              textAlign="center"
              color="#ff0000"
              size={isSmallScreen ? "sm" : "md"}
            >
              {inf.title}
            </Heading>
            <Heading textAlign="center" size={isSmallScreen ? "xs" : "sm"}>
              {inf.subtitle}
            </Heading>
          </VStack>
        ))}
      </HStack>
      <>
        {explanations.map((e, i) => (
          <HStack alignItems="center" key={i} space={"md"}>
            <Heading
              color={"$coolGray400"}
              size={isSmallScreen ? "2xl" : "4xl"}
            >
              {i + 1}
            </Heading>
            <Text flex={1} size={isSmallScreen ? "sm" : "md"}>
              {e}
            </Text>
          </HStack>
        ))}
      </>
    </ConceptWrapper>
  );
};

export default CoreConcept;
