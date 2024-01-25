import Container from "@Components/common/Container";
import InfoTemplate from "@Components/common/InfoTemplate";
import { Heading, VStack } from "@gluestack-ui/themed";
import { IRace, ITeam } from "@lib/models";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import PersonalBestCard from "../PersonalBestCard";
import TeamRaceItem from "../TeamRaceItem";

const TeamResultsTab = ({ team }: { team: ITeam }) => {
  const { t } = useTranslation();
  return (
    <VStack space={"xl"}>
      <VStack p={"$3"} space="md">
        <Heading size={"md"}>{t("team.teamBest")}</Heading>
        {team.personalBest ? (
          <PersonalBestCard result={team.personalBest} />
        ) : (
          <InfoTemplate
            title={t("team.noTeamBest")}
            text={t("team.noTeamBestMessage")}
          />
        )}
      </VStack>
      <VStack space={"md"}>
        <Heading mx={"$3"} size={"md"}>
          {t("team.allResults")}
        </Heading>
      </VStack>
      <Container>
        <FlatList<IRace>
          data={team.races}
          renderItem={({ item, index }) => (
            <TeamRaceItem
              race={item}
              isLast={team.races.length - 1 === index}
              teamId={team.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Container>
    </VStack>
  );
};

export default TeamResultsTab;
