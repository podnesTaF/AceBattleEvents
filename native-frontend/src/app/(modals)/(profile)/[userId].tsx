import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthleteScreenContent from "@Components/athletes/screens/AthleteScreenContent";
import ProfileHeader from "@Components/common/ProfileHeader";
import Tabs from "@Components/common/Tabs";
import { testUserRunner } from "@Constants/dummy-data";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

const tabs = ["BIO", "Teams", "Results", "Events"];

const ProfileScreen = () => {
  const params = useLocalSearchParams();
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
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: () => (
            <VStack width={"$full"} left={"-$16"} pt={"$5"}>
              <Heading textAlign="center" size={"xs"} color="$coolGray300">
                Athlete Profile
              </Heading>
              <Box>
                <ProfileHeader user={testUserRunner} />
              </Box>
              <Box flex={1}>
                <Tabs
                  size="sm"
                  items={tabs}
                  activeColor="$red500"
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                />
              </Box>
            </VStack>
          ),
        }}
      />
      <AthleteScreenContent activeTab={activeTab} />
    </>
  );
};

export default withWatermarkBg(ProfileScreen);
