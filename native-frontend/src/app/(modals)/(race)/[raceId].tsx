import Container from "@Components/common/Container";
import Tabs from "@Components/common/Tabs";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
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
import { IRace } from "@lib/models";
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
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["Overview", "Mile Runners", "Pacer-Joker"];

const tabsData = (race: IRace) => {
  return [
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
    )),
    <ExpandableTable
      rows={getRunnerResultsRows(getFullDistanceAthletes(race))}
    />,
    <ExpandableTable rows={getPacersJokersResultTable(race)} />,
  ];
};

const RaceScreen = () => {
  const { raceId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const { data: race, isLoading, error } = useGetFullRaceQuery(+raceId);
  const flatListRef = useRef<FlatList>(null);
  const { width } = Dimensions.get("window");

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ animated: true, index: activeTab });
  }, [activeTab]);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          header: () => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack
                space={"md"}
                alignItems="center"
                w={"$full"}
                left={Platform.OS === "ios" ? "$0" : "-$16"}
              >
                <VStack alignItems="center" space="md" mb={"$4"}>
                  <Heading size="xs" color={"#fff"}>
                    {race?.event.title || "loading"}
                  </Heading>
                  <Heading size="lg" color={"#fff"}>
                    {race ? getBattleName(race) : "Loading"}
                  </Heading>
                  <Text color={"#fff"}>{formatDate(race?.startTime)}</Text>
                </VStack>
                <Tabs
                  items={tabs}
                  activeColor={"$white"}
                  activeIndex={activeTab}
                  onChangeTab={onChangeTab}
                  passiveColor={"$coolGray100"}
                />
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <SkeletonLoader<IRace>
        error={error}
        height={400}
        isLoading={isLoading}
        data={race}
      >
        {(data) => (
          <>
            {isPassed(data.startTime) ? (
              <ScrollView>
                <Box py={"$5"}>
                  <FlatList
                    ref={flatListRef}
                    data={tabsData(data)}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    renderItem={({ item }) => <Box width={width}>{item}</Box>}
                    keyExtractor={(item, i) => i.toString()}
                    scrollEnabled={false}
                  />
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
                        The race is in proccess.Wait until the race will be
                        finished
                      </Text>
                    </HStack>
                  </VStack>
                </Container>
              </Box>
            )}
          </>
        )}
      </SkeletonLoader>
    </>
  );
};

export default RaceScreen;
