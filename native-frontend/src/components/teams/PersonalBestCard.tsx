import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import { ITeamResult } from "@lib/models";
import { msToMinutesAndSeconds } from "@lib/utils";
import React from "react";

interface Props {
  result: ITeamResult;
}

const PersonalBestCard: React.FC<Props> = ({ result }) => {
  const { isSmallScreen } = useScreenSize();
  return (
    <HStack bgColor="$white" softShadow="1" w={"$full"} minHeight={"$32"}>
      <VStack space="lg" flex={2}>
        <Box
          justifyContent="center"
          alignItems="center"
          width={"$full"}
          height={isSmallScreen ? "$8" : "$10"}
        >
          <Image
            role={"img"}
            alt={"vector"}
            source={require("@Assets/images/title-rect.png")}
            size={"full"}
            position="absolute"
          />
          <Heading size={isSmallScreen ? "md" : "lg"} color={"$white"}>
            Result:
          </Heading>
        </Box>
        <HStack ml={"$2"} justifyContent="center" space="md">
          <Text size={isSmallScreen ? "sm" : "md"}>Date</Text>
          <Heading size={isSmallScreen ? "xs" : "sm"}>23/09/2023</Heading>
        </HStack>
      </VStack>
      <Center flex={3}>
        <Heading size={isSmallScreen ? "2xl" : "4xl"}>
          {msToMinutesAndSeconds(result.resultInMs)}
        </Heading>
      </Center>
    </HStack>
  );
};

export default PersonalBestCard;
