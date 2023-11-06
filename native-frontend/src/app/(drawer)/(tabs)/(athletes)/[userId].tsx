import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ProfileHeader from "@Components/common/ProfileHeader";
import { teams, testUserRunner, users } from "@Constants/dummy-data";
import { Box, Image } from "@gluestack-ui/themed";
import AthleteBioTab from "@Components/athletes/tabs/AthleteBioTab";
import Tabs from "@Components/common/Tabs";
import { ScrollView } from "react-native-gesture-handler";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import TeamDescription from "@Components/teams/TeamDescription";
import ResultsTab from "@Components/athletes/tabs/ResultsTab";
import CompetitionsTab from "@Components/athletes/tabs/CompetitionsTab";

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
              <Box w={"98%"}>
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
      {activeTab === 0 && <ScrollView>
         <AthleteBioTab user={testUserRunner} />
      </ScrollView>}
      {activeTab === 1 && 
      <ScrollView>
          <Box p={"$3"}>
          <TeamPreviewCard team={teams[0]} Item={TeamDescription} imageProportion={1} showLink={true} />
          </Box>
        </ScrollView>
        }
        {activeTab === 2 && (
          <ResultsTab />
        )}
        {activeTab === 3 && (
          <CompetitionsTab />
        )}
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
