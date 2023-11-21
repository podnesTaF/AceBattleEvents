import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import Tabs from "@Components/common/Tabs";
import ContactTab from "@Components/teams/tabs/ContactTab";
import HomeTeamTab from "@Components/teams/tabs/HomeTeamTab";
import RunnersTab from "@Components/teams/tabs/RunnersTab";
import TeamResultsTab from "@Components/teams/tabs/TeamResultsTab";
import {
  HStack,
  Heading,
  Image,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import { useGetTeamQuery } from "@lib/services";
import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

const tabs = ["Home", "Runners", "Results", "Contact"];

const TeamScreen = () => {
  const params = useLocalSearchParams<{ teamId: string }>();
  const { data: team, isLoading, error } = useGetTeamQuery(+params.teamId);
  const [activeTab, setActiveTab] = useState(0);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <StatusBar style={"dark"} />
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
                <WithLoading isLoading={isLoading}>
                  {team && (
                    <>
                      <Image
                        role={"img"}
                        alt={"team logo"}
                        source={{ uri: team.logo.mediaUrl }}
                        size={"sm"}
                      />
                      <Heading size="xl" color={tintColor}>
                        {team.name}
                      </Heading>
                    </>
                  )}
                </WithLoading>
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
      <WithLoading isLoading={isLoading} loadingHeight={200}>
        {activeTab === 0 && (
          <ScrollView>{team && <HomeTeamTab team={team} />}</ScrollView>
        )}
        {activeTab === 1 && team && <RunnersTab team={team} />}
        {activeTab === 2 && team && <TeamResultsTab team={team} />}
        {activeTab === 3 && team && <ContactTab />}
      </WithLoading>
    </>
  );
};

export default withWatermarkBg(TeamScreen);
