import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthleteScreenContent from "@Components/athletes/screens/AthleteScreenContent";
import ProfileHeader from "@Components/common/ProfileHeader";
import Tabs from "@Components/common/Tabs";
import SpectatorBioTab from "@Components/user/tabs/SpectatorBioTab";
import TeamsAndRunners from "@Components/user/tabs/TeamsAndRunners";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { useFetchUserQuery } from "@lib/user/services/UserService";
import { getProfileTabByUserRole } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

const ProfileScreen = () => {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const { data: user, isLoading, error } = useFetchUserQuery(+params.userId);

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
      {user?.runner && (
        <WithLoading isLoading={isLoading}>
          {user && <AthleteScreenContent user={user} activeTab={activeTab} />}
        </WithLoading>
      )}
      {user?.spectator && <SpectatorBioTab user={user} />}
      {user?.manager && (
        <>
          {activeTab === 0 && <SpectatorBioTab user={user} />}
          {activeTab === 1 && <TeamsAndRunners user={user} />}
        </>
      )}
    </>
  );
};

export default withWatermarkBg(ProfileScreen);
