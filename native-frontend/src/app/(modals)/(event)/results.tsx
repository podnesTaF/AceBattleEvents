import WithLoading from "@Components/HOCs/withLoading";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import RaceCard from "@Components/race/RaceCard";
import RaceOverview from "@Components/race/RaceOverview";
import { eventPodium } from "@Constants/dummy-data";
import {
  Box,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useFetchEventResultsQuery } from "@lib/events/services";
import { EventResult, RaceShortForm } from "@lib/models";
import { Stack, useLocalSearchParams } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["Overview", "By Race"];

const tabsData = (eventResult: EventResult) => {
  return [
    <RaceOverview eventResult={eventResult} />,
    <Box py={"$4"}>
      <Heading mx={"$4"} size="lg" mb={"$2"}>
        Races
      </Heading>
      <Container borderSize={2}>
        {Object.keys(eventResult.racesByType).map((type, i) => (
          <VStack key={i}>
            {(eventPodium.racesByType as any)[type].map(
              (race: RaceShortForm) => (
                <RaceCard key={race.id} race={race} />
              )
            )}
          </VStack>
        ))}
      </Container>
    </Box>,
  ];
};

const results = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { width } = Dimensions.get("window");
  const { eventId } = useLocalSearchParams();

  const {
    data: eventResult,
    error: eventResultError,
    isLoading: eventResultLoading,
  } = useFetchEventResultsQuery(+eventId);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ animated: true, index: activeTab });
  }, [activeTab]);

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
          header: () => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack space={"md"} alignItems="center" w={"$full"}>
                <HeaderSubtitledTitle
                  subtitle={eventResult?.eventTitle || ""}
                  title={"Results"}
                  tintColor={"#fff"}
                />
                <Tabs
                  items={tabs}
                  activeColor={"#ff0000"}
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                />
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <WithLoading isLoading={eventResultLoading}>
        {!eventResult?.notFinished ? (
          eventResult && (
            <ScrollView>
              <FlatList
                ref={flatListRef}
                data={tabsData(eventResult)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                renderItem={({ item }) => <Box width={width}>{item}</Box>}
                keyExtractor={(item, i) => i.toString()}
                scrollEnabled={false}
              />
            </ScrollView>
          )
        ) : (
          <Box flex={1} py={"$6"}>
            <Container>
              <Box py={"$4"} pr={"$4"} minHeight={"$24"}>
                <HStack space="sm" alignItems="center">
                  <Icon as={InfoIcon} size="lg" />
                  <Text>
                    Overview is not ready. The event has not been finished yet.
                    You can try to see the results by race in the other tab!
                  </Text>
                </HStack>
              </Box>
            </Container>
          </Box>
        )}
      </WithLoading>
    </>
  );
};

export default results;
