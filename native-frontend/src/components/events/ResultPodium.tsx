import { Box, HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { EventPodium } from "@lib/types";
import { msToMinutesAndSeconds } from "@lib/utils";
import React from "react";

interface IProps {
  podium: EventPodium;
  gender: string;
}

const ResultPodium: React.FC<IProps> = ({ podium, gender }) => {
  return (
    <VStack alignItems="center" space="sm">
      <Heading size="md" color="$white">
        {gender === "male" ? "Men's" : "Women's"} Battle
      </Heading>
      <HStack>
        {[2, 1, 3].map((place) => (
          <VStack space="sm" w={"$1/3"} key={place} justifyContent="flex-end">
            {podium[gender][place] && (
              <VStack space="sm" alignItems="center">
                <Image
                  role="img"
                  alt={"team logo"}
                  size={"lg"}
                  source={{ uri: podium[gender][place]?.team.logo.mediaUrl }}
                />
                <VStack alignItems="center">
                  <Heading size={"sm"} color={"$white"}>
                    {podium[gender][place]?.team.name}
                  </Heading>
                  <Heading size={"sm"} color={"$white"}>
                    {msToMinutesAndSeconds(podium[gender][place]?.resultInMs)}
                  </Heading>
                </VStack>
              </VStack>
            )}
            <Box
              w={"$full"}
              alignItems="center"
              borderTopLeftRadius={"$lg"}
              borderTopRightRadius={"$lg"}
              height={place === 2 ? "$20" : place === 1 ? "$24" : "$16"}
              bgColor={
                place === 2 ? "#ff0000" : place === 1 ? "#1E1F1C" : "$white"
              }
              borderColor={"$white"}
              borderWidth={place === 1 ? 2 : 0}
            >
              <Heading size={"4xl"} color={place !== 3 ? "$white" : "$black"}>
                {place}
              </Heading>
            </Box>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default ResultPodium;
