import MilerCard from "@Components/athletes/MilerCard";
import PairCard from "@Components/athletes/PairCard";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import ResultPodium from "@Components/events/ResultPodium";
import RaceCard from "@Components/race/RaceCard";
import { eventPodium, events } from "@Constants/dummy-data";
import {
  Box,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { RaceShortForm } from "@lib/models";
import { isPassed } from "@lib/utils";
import { Stack } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React, { useState } from "react";

const tabs = ["Overview", "By Race"];

const results = () => {
  const [activeTab, setActiveTab] = useState(0);
  const event = events[0];

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
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <VStack width={"100%"} left={"-$16"} space="md">
              <HeaderSubtitledTitle
                subtitle="Brussels Mile"
                title={"Results"}
                tintColor={tintColor}
              />
              <Tabs
                items={tabs}
                activeColor={"#ff0000"}
                onChangeTab={onChangeTab}
                activeIndex={activeTab}
              />
            </VStack>
          ),
        }}
      />
      {isPassed(event.startDateTime) ? (
        <ScrollView>
          {activeTab === 0 && (
            <>
              <Box my={"$4"}>
                <Heading size={"xl"} mx={"$4"}>
                  Winners
                </Heading>
                <VStack
                  space="md"
                  bg={"#1E1C1F"}
                  alignItems="center"
                  px={"$6"}
                  py={"$4"}
                >
                  <ResultPodium
                    podium={eventPodium.podium as any}
                    gender={"male"}
                  />
                  <ResultPodium
                    podium={eventPodium.podium as any}
                    gender={"female"}
                  />
                </VStack>
              </Box>
              <VStack px={"$3"} my="$4" space="md">
                <Heading size={"lg"}>Best Mile</Heading>
                {Object.keys(eventPodium.bestSportsmen).map((item: any) => (
                  <MilerCard
                    key={item}
                    resultInMs={
                      (eventPodium.bestSportsmen as any)[item]!.finalResultInMs
                    }
                    runner={(eventPodium.bestSportsmen as any)[item].runner}
                  />
                ))}
              </VStack>
              <VStack space="lg">
                {Object.keys(eventPodium.bestJokerPair).map((category) => (
                  <PairCard
                    key={category}
                    runnerResults={
                      (eventPodium.bestJokerPair as any)[category].runners
                    }
                    finalResultInMs={
                      (eventPodium.bestJokerPair as any)[category]
                        .finalResultInMs
                    }
                    category={category}
                  />
                ))}
              </VStack>
            </>
          )}
          {activeTab === 1 && (
            <Box py={"$4"}>
              <Heading size="lg" mb={"$2"}>
                Races
              </Heading>
              <Container borderSize={2}>
                {Object.keys(eventPodium.racesByType).map((type, i) => (
                  <VStack key={i}>
                    {(eventPodium.racesByType as any)[type].map(
                      (race: RaceShortForm) => (
                        <RaceCard key={race.id} race={race} />
                      )
                    )}
                  </VStack>
                ))}
              </Container>
            </Box>
          )}
        </ScrollView>
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
    </>
  );
};

export default results;
