import WithLoading from "@Components/HOCs/withLoading";
import Container from "@Components/common/Container";
import Tabs from "@Components/common/Tabs";
import ExpandableTable from "@Components/custom/tables/ExpandableTable";
import {
  Box,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetFullRaceQuery } from "@lib/races/services/raceService";
import { getPacersJokersResultTable } from "@lib/races/utils/pacer-joker-table";
import {
  formatDate,
  getBattleName,
  getFullDistanceAthletes,
  getRunnerResultsRows,
  isPassed,
  msToMinutesAndSeconds,
} from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React, { useState } from "react";

const tabs = ["Overview", "Mile Runners", "Pacer-Joker"];

const RaceScreen = () => {
  const { raceId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const { data: race, isLoading, error } = useGetFullRaceQuery(+raceId);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <VStack space={"md"} alignItems="center" w={"$full"} left={"-$16"}>
              <VStack alignItems="center" space="md" mb={"$4"}>
                <Heading size="xs" color={tintColor}>
                  {race?.event.title || "loading"}
                </Heading>
                <Heading size="lg" color={tintColor}>
                  {race ? getBattleName(race) : "Loading"}
                </Heading>
                <Text color={tintColor}>{formatDate(race?.startTime)}</Text>
              </VStack>
              <Tabs
                items={tabs}
                activeColor={"$white"}
                activeIndex={activeTab}
                onChangeTab={onChangeTab}
                passiveColor={"$coolGray100"}
              />
            </VStack>
          ),
        }}
      />
      <WithLoading isLoading={isLoading || !race}>
        {race && isPassed(race.startTime) ? (
          <ScrollView>
            <Box py={"$5"}>
              {tabs[activeTab] === "Overview" &&
                race.teamResults?.map((teamResult, i) => (
                  <VStack key={teamResult.id}>
                    <HStack space="md" alignItems="center" p={"$2"}>
                      <Heading size="sm">{i + 1}.</Heading>
                      <Heading size="sm">{teamResult.team.name}</Heading>
                      <Heading size="sm" ml={"auto"}>
                        {msToMinutesAndSeconds(teamResult.resultInMs)}
                      </Heading>
                    </HStack>
                    <ExpandableTable
                      rows={getRunnerResultsRows(teamResult.runnerResults)}
                    />
                  </VStack>
                ))}
              {tabs[activeTab] === "Mile Runners" && (
                <ExpandableTable
                  rows={getRunnerResultsRows(getFullDistanceAthletes(race))}
                />
              )}
              {activeTab === 2 && (
                <ExpandableTable rows={getPacersJokersResultTable(race)} />
              )}
            </Box>
          </ScrollView>
        ) : (
          <Box my={"$4"}>
            <Container vertical>
              <VStack py={"$3"} px={"$2"} space="md">
                <Heading>Results are not ready</Heading>
                <HStack space="md" alignItems="center">
                  <Icon as={InfoIcon} size="lg" />
                  <Text>
                    The race is in proccess.Wait until the race will be finished
                  </Text>
                </HStack>
              </VStack>
            </Container>
          </Box>
        )}
      </WithLoading>
    </>
  );
};

export default RaceScreen;
