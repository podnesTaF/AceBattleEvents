import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import RunnerParticipants from "@Components/events/RunnerParticipants";
import TeamsParticipants from "@Components/events/TeamsParticipants";
import { Box, ScrollView, VStack } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";

const tabs = ["Teams", "Runners"];

const tabsData = (eventId?: string) => {
  return [
    <TeamsParticipants eventId={eventId} />,
    <RunnerParticipants eventId={eventId} />,
  ];
};

const participants = () => {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();

  const [activeTab, setActiveTab] = useState(0);

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
          headerTitle: ({ tintColor }) => (
            <VStack space={"md"} alignItems="center" w={"$full"} left={"-$16"}>
              <HeaderSubtitledTitle
                title={"Participants"}
                subtitle="Brussels mile"
                tintColor={tintColor}
              />
              <Tabs
                activeColor={"#ff0000"}
                activeIndex={activeTab}
                items={tabs}
                onChangeTab={onChangeTab}
              />
            </VStack>
          ),
        }}
      />
      <FlatList
        ref={flatListRef}
        data={tabsData(eventId)}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        renderItem={({ item }) => (
          <Box w={width}>
            <ScrollView>{item}</ScrollView>
          </Box>
        )}
      />
    </>
  );
};

export default participants;
