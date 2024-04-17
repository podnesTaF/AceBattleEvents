import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ITeam } from "@lib/models";
import { convertFlagIntoPng } from "@lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

interface TeamProps {
  team: ITeam;
}

const TeamDescription: React.FC<TeamProps> = ({ team }) => {
  const { t } = useTranslation();
  return (
    <Box flex={1} px={"$4"} py={"$2"}>
      <VStack space="md">
        <HStack space="4xl" alignItems="center" justifyContent="space-between">
          <Text size={"lg"}>{t("team.country")}</Text>
          <HStack space="sm" alignItems="center">
            {team.country?.flagIconUrl && (
              <Image
                source={{ uri: convertFlagIntoPng(team.country.flagIconUrl) }}
                role={"img"}
                alt={"flag"}
                size={"2xs"}
              />
            )}
            <Heading size={"lg"}>{team.country?.name}</Heading>
          </HStack>
        </HStack>
        <HStack space="4xl" alignItems="center" justifyContent="space-between">
          <Text size={"lg"}>{t("team.rank")}</Text>
          <Heading size={"lg"}># {team.rank}</Heading>
        </HStack>
        {team.eventRegistrations?.[0].coach && (
          <HStack
            space="4xl"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text size={"lg"}>{t("team.coach")}</Text>
            <Heading size={"lg"}>
              {team.eventRegistrations[0].coach?.user?.name}{" "}
              {team.eventRegistrations[0].coach?.user?.surname}
            </Heading>
          </HStack>
        )}
        <HStack space="4xl" alignItems="center" justifyContent="space-between">
          <Text size={"lg"}>{t("team.finishedRaces")}</Text>
          <Heading size={"lg"}>2</Heading>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TeamDescription;
