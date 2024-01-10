import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthleteBioTab from "@Components/athletes/tabs/AthleteBioTab";
import CompetitionsTab from "@Components/athletes/tabs/CompetitionsTab";
import ResultsTab from "@Components/athletes/tabs/ResultsTab";
import ProfileHeader from "@Components/common/ProfileHeader";
import Tabs from "@Components/common/Tabs";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import UserCardSkeleton from "@Components/user/UserCardSkeleton";
import CoachTeamsTab from "@Components/user/tabs/CoachTeamsTab";
import SpectatorBioTab from "@Components/user/tabs/SpectatorBioTab";
import TeamsAndRunners from "@Components/user/tabs/TeamsAndRunners";
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { IUser } from "@lib/models";
import { selectUser } from "@lib/store";
import { useFetchUserQuery } from "@lib/user/services/UserService";
import { getProfileTabByUserRole } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabsData = (user: IUser) => {
  if (user.runner) {
    return [
      <ScrollView>
        <AthleteBioTab user={user} />
      </ScrollView>,
      <ScrollView>
        <VStack p={"$3"} space="lg">
          {user.runner.teamsAsRunner?.length ? (
            user.runner.teamsAsRunner.map((team) => (
              <TeamPreviewCard
                key={team.id}
                team={team}
                Item={TeamDescription}
                imageProportion={1}
                showLink={true}
              />
            ))
          ) : (
            <Box>
              <Heading size="md" color="$coolGray300">
                This athlete is not a member of any team
              </Heading>
            </Box>
          )}
        </VStack>
      </ScrollView>,
      <ResultsTab runner={user.runner} />,
      <CompetitionsTab runnerId={user.runner.id} />,
    ];
  } else if (user.manager) {
    return [<SpectatorBioTab user={user} />, <TeamsAndRunners user={user} />];
  } else if (user.role === "spectator") {
    return [<SpectatorBioTab user={user} />];
  } else if (user.coach) {
    return [<SpectatorBioTab user={user} />, <CoachTeamsTab user={user} />];
  }
  return [];
};

const ProfileScreen = () => {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const auth = useAppSelector(selectUser);
  const {
    data: user,
    isLoading,
    error,
  } = useFetchUserQuery({ userId: +params.userId, authId: auth?.id });

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
          header: ({ navigation }) => (
            <SafeAreaView style={{ backgroundColor: "#1c1e1f" }}>
              <VStack width={"$full"}>
                <HStack minHeight={32} space="lg" alignItems="center" px={"$2"}>
                  {Platform.OS !== "ios" && (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      hitSlop={40}
                    >
                      <Ionicons name="arrow-back" size={32} color="#fff" />
                    </TouchableOpacity>
                  )}
                  <Heading
                    w={"$full"}
                    textTransform="capitalize"
                    position="absolute"
                    textAlign="center"
                    size={"xs"}
                    color="$coolGray300"
                  >
                    Profile
                  </Heading>
                </HStack>
                <SkeletonLoader<IUser>
                  data={user}
                  isLoading={isLoading}
                  error={error}
                  loadingComponent={
                    <Box w={width} ml={"$8"} py={"$1"}>
                      <UserCardSkeleton height={50} />
                    </Box>
                  }
                >
                  {(data) => <ProfileHeader user={data} />}
                </SkeletonLoader>
                <Tabs
                  size="sm"
                  items={getProfileTabByUserRole(user?.role)}
                  activeColor="$red500"
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                />
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <SkeletonLoader<IUser> error={error} data={user} isLoading={isLoading}>
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

export default withWatermarkBg(ProfileScreen);
