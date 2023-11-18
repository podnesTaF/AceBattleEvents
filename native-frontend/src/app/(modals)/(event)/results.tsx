import WithLoading from "@Components/HOCs/withLoading";
import MilerCard from "@Components/athletes/MilerCard";
import PairCard from "@Components/athletes/PairCard";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import ResultPodium from "@Components/events/ResultPodium";
import RaceCard from "@Components/race/RaceCard";
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
import { RaceShortForm } from "@lib/models";
import { Stack, useLocalSearchParams } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React, { useState } from "react";

const tabs = ["Overview", "By Race"];

const results = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { eventId } = useLocalSearchParams();

  const {
    data: eventResult,
    error: eventResultError,
    isLoading: eventResultLoading,
  } = useFetchEventResultsQuery(+eventId);

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
            <VStack width={"100%"} left={"-$16"} space="md">
              <HeaderSubtitledTitle
                subtitle={eventResult?.eventTitle || ""}
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
      <WithLoading isLoading={eventResultLoading}>
        {!eventResult?.notFinished ? (
          eventResult && (
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
                        podium={eventResult.podium}
                        gender={"male"}
                      />
                      <ResultPodium
                        podium={eventResult.podium}
                        gender={"female"}
                      />
                    </VStack>
                  </Box>
                  <VStack px={"$3"} my="$4" space="md">
                    <Heading size={"lg"}>Best Mile</Heading>
                    {Object.keys(eventResult.bestSportsmen).map((item: any) => (
                      <MilerCard
                        key={item}
                        resultInMs={
                          eventResult.bestSportsmen[item]!.finalResultInMs
                        }
                        runner={eventResult.bestSportsmen[item].runner}
                      />
                    ))}
                  </VStack>
                  <VStack space="lg">
                    {Object.keys(eventResult.bestJokerPair).map((category) => (
                      <PairCard
                        key={category}
                        runnerResults={
                          (eventResult.bestJokerPair as any)[category].runners
                        }
                        finalResultInMs={
                          (eventResult.bestJokerPair as any)[category]
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
                </Box>
              )}
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
