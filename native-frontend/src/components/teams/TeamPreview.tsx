import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ITeam } from "@lib/models";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

interface TeamProps {
  team: ITeam;
}

const TeamPreview: React.FC<TeamProps> = ({ team }) => {
  const { t } = useTranslation();
  return (
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
          <HStack justifyContent="space-between" alignItems="flex-end">
            <Heading size={"xs"} color="$coolGray300">
              {t("common.rank")} {team.rank}
            </Heading>
            <Link href={`/(modals)/(team)/${team.id}`} asChild>
              <Text color="$red500" fontWeight="600">
                {t("links.visitTeamPage")}
              </Text>
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TeamPreview;
