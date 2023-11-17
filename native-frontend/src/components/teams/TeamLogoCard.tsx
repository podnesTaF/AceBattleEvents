import { Heading, Image, VStack } from "@gluestack-ui/themed";
import { ITeam } from "@lib/models";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

interface Props {
  team: ITeam;
  logoHeight?: number;
}

const TeamLogoCard: React.FC<Props> = ({ team, logoHeight }) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/(modals)/(team)/${team.id}`)}>
      {({ pressed }) => (
        <VStack
          space={"xs"}
          alignItems="center"
          width={"$full"}
          opacity={pressed ? "$80" : "$100"}
        >
          <Image
            role={"img"}
            source={
              team.logo.mediaUrl ||
              "https://storage.googleapis.com/abe_cloud_storage/image/large/55c30c67-37aa-4476-bae9-b6f847a707fd.png"
            }
            alt={"team logo"}
            height={logoHeight || 120}
            width={100}
          />
          <Heading size={"sm"} textTransform="uppercase" textAlign="center">
            {team.name}
          </Heading>
        </VStack>
      )}
    </Pressable>
  );
};

export default TeamLogoCard;
