import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthleteBioTab from "@Components/athletes/tabs/AthleteBioTab";
import CompetitionsTab from "@Components/athletes/tabs/CompetitionsTab";
import ResultsTab from "@Components/athletes/tabs/ResultsTab";
import ProfileHeader from "@Components/common/ProfileHeader";
import Tabs from "@Components/common/Tabs";
import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import SpectatorBioTab from "@Components/user/tabs/SpectatorBioTab";
import TeamsAndRunners from "@Components/user/tabs/TeamsAndRunners";
import { Box, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { IUser } from "@lib/models";
import { selectUser } from "@lib/store";
import { useFetchUserQuery } from "@lib/user/services/UserService";
import { getProfileTabByUserRole } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";

const tabsData = (user: IUser) => {
  if (user.runner) {
    return [
      <ScrollView>
        <AthleteBioTab user={user} />
      </ScrollView>,
      <ScrollView>
        <Box p={"$3"}>
          {user.runner.teamsAsRunner?.map((team) => (
            <TeamPreviewCard
              key={team.id}
              team={team}
              Item={TeamDescription}
              imageProportion={1}
              showLink={true}
            />
          ))}
        </Box>
      </ScrollView>,
      <ResultsTab runner={user.runner} />,
      <CompetitionsTab runnerId={user.runner.id} />,
    ];
  } else if (user.manager) {
    return [<SpectatorBioTab user={user} />, <TeamsAndRunners user={user} />];
  } else if (user.spectator) {
    return [<SpectatorBioTab user={user} />];
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
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: () => (
            <VStack width={"$full"} left={"-$16"} pt={"$5"}>
              <Heading
                textTransform="capitalize"
                textAlign="center"
                size={"xs"}
                color="$coolGray300"
              >
                Profile
              </Heading>
              <WithLoading isLoading={isLoading} loadingHeight={"$12"}>
                {user && <ProfileHeader user={user} />}
              </WithLoading>
              <Box flex={1}>
                <Tabs
                  size="sm"
                  items={getProfileTabByUserRole(user?.role)}
                  activeColor="$red500"
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                />
              </Box>
            </VStack>
          ),
        }}
      />
      <WithLoading isLoading={isLoading}>
        {user && (
          <FlatList
            ref={flatListRef}
            data={tabsData(user)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            renderItem={({ item }) => <View style={{ width }}>{item}</View>}
            keyExtractor={(item, i) => i.toString()}
            scrollEnabled={false}
          />
        )}
      </WithLoading>
    </>
  );
};

export default withWatermarkBg(ProfileScreen);
