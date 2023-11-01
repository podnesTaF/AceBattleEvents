import React from "react";
import {
  Box,
  VStack,
  Image,
  HStack,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

interface TeamProps {
  team: any;
}

const TeamPreviewCard: React.FC<TeamProps> = ({ team }) => {
  return (
    <VStack
      minWidth={340}
      rounded={"$md"}
      bg={"$white"}
      softShadow="1"
      overflow="hidden"
    >
      <Box
        flex={3}
        height={"$40"}
        width={"$full"}
        position="relative"
        alignItems="stretch"
      >
        <Image
          role={"img"}
          source={{ uri: "https://acebattlemile.org/profile-bg-lg.jpg" }}
          alt={"team preview"}
          size="full"
        />
      </Box>
      <Box flex={1} p={"$2"}>
        <HStack alignItems="center">
          <Box flex={1}>
          <Image
            role={"img"}
            source={{ uri: team.logo.mediaUrl }}
            alt={"team logo"}
            size="xs"
            mr={"$3"}
          />
          </Box>
          <VStack space="sm" flex={5}>
            <Heading size={"md"}>Team {team.name}</Heading>
            <HStack
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Heading size={"xs"} color="$coolGray300">
                Rank {team.rank}
              </Heading>
              <Link href={"/(drawer)/(tabs)/(team)/33"}>
                <Text color="$red500" fontWeight="600">
                  visit team page
                </Text>
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default TeamPreviewCard;
