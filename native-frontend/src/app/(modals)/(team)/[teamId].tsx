import withWatermarkBg from "@Components/HOCs/withWatermark";
import Tabs from "@Components/common/Tabs";
import ContactTab from "@Components/teams/tabs/ContactTab";
import HomeTeamTab from "@Components/teams/tabs/HomeTeamTab";
import RunnersTab from "@Components/teams/tabs/RunnersTab";
import TeamResultsTab from "@Components/teams/tabs/TeamResultsTab";
import { teams } from "@Constants/dummy-data";
import {
  HStack,
  Heading,
  Image,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

const tabs = ["Home", "Runners", "Results", "Contact"];

const TeamScreen = () => {
  const params = useLocalSearchParams();
  const [team, setTeam] = useState(teams[0]);
  const [activeTab, setActiveTab] = useState(0);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: ({ tintColor }) => (
            <VStack alignItems="center" width={"100%"} space="md" left={"-$16"}>
              <HStack
                py={"$2"}
                space="sm"
                w={"$full"}
                justifyContent="center"
                alignItems="center"
                left={"-$4"}
              >
                <Image
                  role={"img"}
                  alt={"team logo"}
                  source={{ uri: team.logo.mediaUrl }}
                  size={"sm"}
                />
                <Heading size="xl" color={tintColor}>
                  {team.name}
                </Heading>
              </HStack>
              <Tabs
                activeColor={"$red500"}
                items={tabs}
                onChangeTab={onChangeTab}
                activeIndex={activeTab}
              />
            </VStack>
          ),
        }}
      />
      {activeTab === 0 && (
        <ScrollView>
          <HomeTeamTab team={team} />
        </ScrollView>
      )}
      {activeTab === 1 && <RunnersTab team={team} />}
      {activeTab === 2 && <TeamResultsTab team={team} />}
      {activeTab === 3 && <ContactTab />}
    </>
  );
};

export default withWatermarkBg(TeamScreen);
