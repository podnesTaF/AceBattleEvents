import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthleteScreenContent from "@Components/athletes/screens/AthleteScreenContent";
import ProfileHeader from "@Components/common/ProfileHeader";
import Tabs from "@Components/common/Tabs";
import { testUserRunner } from "@Constants/dummy-data";
import { Box } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

const tabs = ["BIO", "Teams", "Results", "Competitions"];

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
            <Box w={"$full"}>
              <Box w={"97%"}>
                <ProfileHeader user={testUserRunner} />
              </Box>
              <Box left={"-$12"}>
                <Tabs
                  size="md"
                  items={tabs}
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                />
              </Box>
            </Box>
          ),
        }}
      />
      <AthleteScreenContent activeTab={activeTab} />
    </>
  );
};

export default withWatermarkBg(ProfileScreen);
