import YoutubeCard from "@Components/common/YoutubeCard";
import { provenContent } from "@Constants/info-contents";
import { Center, HStack, Heading, VStack } from "@gluestack-ui/themed";
import React from "react";
import ConceptWrapper from "./ConceptWrapper";

const Proven = () => {
  return (
    <ConceptWrapper title={"PROVEN IN UKRAINE"}>
      <HStack
        pl={"$8"}
        flexWrap="wrap"
        space="md"
        justifyContent="space-around"
      >
        {provenContent.map((p, i) => (
          <VStack key={i} w={"$2/5"}>
            <Heading size={"md"} textAlign="center" color="#ff0000">
              {p.title}
            </Heading>
            <Heading size={"sm"} textAlign="center">
              {p.subtitle}
            </Heading>
          </VStack>
        ))}
      </HStack>
      <>
        <Heading color="#ff0000" size={"xl"}>
          BRINGING TEAM BATTLES TO INDIVIDUAL SPORT
        </Heading>
        <Center w={"$full"} height={260}>
          <YoutubeCard
            video={{
              videoId: "WSUfPBJf_P4",
              title: "What's Battle Mile Structure and Rules",
            }}
          />
        </Center>
      </>
    </ConceptWrapper>
  );
};

export default Proven;
