import { Box, HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { IRunner } from "@lib/models";
import { msToMinutesAndSeconds } from "@lib/utils";
import React from "react";

const MilerCard = ({
  runner,
  resultInMs,
}: {
  runner: IRunner;
  resultInMs: number;
}) => {
  return (
    <HStack bgColor="$white" borderRightWidth={2} borderColor="#ff0000">
      <Box flex={2}>
        <Image
          role={"img"}
          alt="sportsman image"
          source={{ uri: runner.user.image?.mediaUrl }}
          objectFit="cover"
          height={140}
          size={"full"}
        />
      </Box>
      <VStack flex={3} p={"$4"} px={"$6"} space="md">
        <Heading size={"md"}>
          {runner.user.name} {runner.user.surname}
        </Heading>
        <HStack justifyContent="space-between" space="lg">
          <Heading size={"sm"} textTransform="uppercase">
            Mile Result
          </Heading>
          <Heading size={"sm"} textTransform="uppercase">
            {msToMinutesAndSeconds(resultInMs)}
          </Heading>
        </HStack>
        <HStack justifyContent="space-between" space="lg">
          <Heading size={"sm"} textTransform="uppercase">
            Rank
          </Heading>
          <Heading size={"sm"} textTransform="uppercase">
            {runner.rank}
          </Heading>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default MilerCard;
