import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ProfileHeader from "@Components/common/ProfileHeader";
import { testUserRunner } from "@Constants/dummy-data";
import { Box, Image } from "@gluestack-ui/themed";
import Tabs from "@Components/common/Tabs";
import AthleteScreenContent from "@Components/athletes/screens/AthleteScreenContent";

const tabs = ["BIO", "Teams", "Results", 'Competitions'];

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
      <Image
            source={require("@Assets/images/main-bg.png")}
            role={"img"}
            alt="bg"
            position='absolute'
            size={"full"}
            left={0}
            bottom={0}
            top={0}
            right={0}
            zIndex={-10}
        />
    </>
  );
};

export default AthleteScreen;
