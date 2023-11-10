import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthleteScreenContent from "@Components/athletes/screens/AthleteScreenContent";
import ProfileHeader from "@Components/common/ProfileHeader";
import Tabs from "@Components/common/Tabs";
import { testUserRunner } from "@Constants/dummy-data";
import { Box } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

const tabs = ["BIO", "Teams", "Results", "Competitions"];

const AthleteScreen = () => {
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
          headerTintColor: "#fff",
          headerTitle: () => (
            <Box w={"$full"}>
              <Box>
                <ProfileHeader user={testUserRunner} />
              </Box>
              <Box left={"-$16"}>
                <Tabs
                  size="md"
                  items={tabs}
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                  activeColor="$red500"
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

export default withWatermarkBg(AthleteScreen);