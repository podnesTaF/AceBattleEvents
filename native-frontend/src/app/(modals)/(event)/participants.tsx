import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import RunnerParticipants from "@Components/events/RunnerParticipants";
import TeamsParticipants from "@Components/events/TeamsParticipants";
import { Box, ScrollView, VStack } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["Teams", "Runners"];

const tabsData = (eventId?: string) => {
  return [
    <TeamsParticipants eventId={eventId} />,
    <RunnerParticipants eventId={eventId} />,
  ];
};

const participants = () => {
  const { eventId, name } = useLocalSearchParams<{
    eventId?: string;
    name?: string;
  }>();

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
          headerShown: true,
          headerTintColor: "#fff",
          header: () => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack space={"md"} alignItems="center" w={"$full"}>
                <HeaderSubtitledTitle
                  title={"Participants"}
                  subtitle={name || "Event"}
                  tintColor={"#fff"}
                />
                <Tabs
                  activeColor={"#ff0000"}
                  activeIndex={activeTab}
                  items={tabs}
                  onChangeTab={onChangeTab}
                />
              </VStack>
            </SafeAreaView>
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
