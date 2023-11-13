import MilerCard from "@Components/athletes/MilerCard";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import ResultPodium from "@Components/events/ResultPodium";
import { eventPodium } from "@Constants/dummy-data";
import { Box, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React, { useState } from "react";

const tabs = ["Overview", "By Race"];

const results = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      <ScrollView>
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
            <ResultPodium podium={eventPodium.podium as any} gender={"male"} />
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
      </ScrollView>
    </>
  );
};

export default results;
