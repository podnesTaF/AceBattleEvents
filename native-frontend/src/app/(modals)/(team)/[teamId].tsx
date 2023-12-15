import withWatermarkBg from "@Components/HOCs/withWatermark";
import Tabs from "@Components/common/Tabs";
import BoxSkeleton from "@Components/common/states/BoxSkeleton";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import ContactTab from "@Components/teams/tabs/ContactTab";
import HomeTeamTab from "@Components/teams/tabs/HomeTeamTab";
import RunnersTab from "@Components/teams/tabs/RunnersTab";
import TeamResultsTab from "@Components/teams/tabs/TeamResultsTab";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Heading,
  Image,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { ITeam } from "@lib/models";
import { useGetTeamQuery } from "@lib/services";
import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, SafeAreaView } from "react-native";

const tabs = ["Home", "Runners", "Results", "Contact"];

const tabsData = (team: ITeam) => {
  return [
    <HomeTeamTab team={team} />,
    <RunnersTab team={team} />,
    <TeamResultsTab team={team} />,
    <ContactTab />,
  ];
};

const TeamScreen = () => {
  const params = useLocalSearchParams<{ teamId: string }>();
  const { data: team, isLoading, error } = useGetTeamQuery(+params.teamId);
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
      <StatusBar style={"dark"} />
      <Stack.Screen
        options={{
          headerShown: true,
          header: (props) => (
            <SafeAreaView>
              <VStack alignItems="center" width={width} space="md" zIndex={10}>
                <HStack
                  py={"$2"}
                  px={"$4"}
                  space="sm"
                  w={"$full"}
                  alignItems="center"
                >
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    onPress={() => props.navigation.goBack()}
                  />
                  <HStack flex={1} alignItems="center" px="5%">
                    <SkeletonLoader<ITeam>
                      error={error}
                      data={team}
                      isLoading={isLoading}
                      loadingComponent={
                        <Box w={"$full"} alignItems="center">
                          <BoxSkeleton width={150} height={50} />
                        </Box>
                      }
                    >
                      {(team) => (
                        <>
                          <Image
                            role={"img"}
                            alt={"team logo"}
                            source={{ uri: team.logo.mediaUrl }}
                            size={"sm"}
                          />
                          <Heading size="xl">{team.name}</Heading>
                        </>
                      )}
                    </SkeletonLoader>
                  </HStack>
                </HStack>
                <Tabs
                  activeColor={"$red500"}
                  items={tabs}
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                />
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <SkeletonLoader<ITeam>
        data={team}
        isLoading={isLoading}
        error={error}
        height={300}
      >
        {(data) => (
          <FlatList
            ref={flatListRef}
            data={tabsData(data)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            renderItem={({ item }) => <View style={{ width }}>{item}</View>}
            keyExtractor={(item, i) => i.toString()}
            scrollEnabled={false}
          />
        )}
      </SkeletonLoader>
    </>
  );
};

export default withWatermarkBg(TeamScreen);
