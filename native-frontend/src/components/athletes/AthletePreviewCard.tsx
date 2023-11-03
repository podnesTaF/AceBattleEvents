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

interface AthleteProps {
  runner: any;
}

const AthletePreviewCard: React.FC<AthleteProps> = ({ runner }) => {
  return (
    <VStack
      minWidth={340}
      rounded={"$md"}
      bg={"$white"}
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
          source={{ uri:  runner.user.image?.mediaUrl || "https://acebattlemile.org/profile-bg-lg.jpg" }}
          alt={"team preview"}
          size="full"
        />
      </Box>
      <Box flex={1} p={"$2"}>
        <HStack alignItems="center">
          <VStack space="sm" flex={1}>
            <Heading size={"md"}>{runner.user.name} {runner.user.surname}</Heading>
            <HStack
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <HStack space={'xl'} justifyContent="space-between">
                <Heading size={"xs"} color="$coolGray300">
                    {runner.teamsAsRunner?.length ? runner.teamsAsRunner[0].name : '-'}
                </Heading>
                <Heading size={"xs"} color="$coolGray300">
                 Rank {runner.rank > 1000 ? '-' : runner.rank}
              </Heading>
              </HStack>
              <Link href={"/(drawer)/(tabs)/(athletes)/33"}>
                <Text color="$red500" fontWeight="600">
                  visit runner profile
                </Text>
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default AthletePreviewCard;
