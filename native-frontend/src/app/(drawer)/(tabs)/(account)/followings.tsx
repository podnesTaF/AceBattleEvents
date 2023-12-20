import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import FollowingAthletesList from "@Components/athletes/FollowingAthletesList";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { ITeam } from "@lib/models";
import { useGetFollowingTeamsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { scaleSize } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Followings = () => {
  const user = useAppSelector(selectUser);
  const { data: teams, isLoading, error } = useGetFollowingTeamsQuery();

  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "#fff",
          header: (props) => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack alignItems="center" width={"100%"} py={"$1"} space="md">
                <LogoTitle {...props} />
                <Heading size="sm" color="$coolGray200">
                  Followings
                </Heading>
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <ScrollView bg={"$fff9ff"}>
        <VStack my={"$4"} space="sm">
          <HStack mx={"$4"}>
            <Heading size="lg">Following </Heading>
            <Heading size="lg" color="$red500">
              Teams
            </Heading>
          </HStack>
          <SkeletonLoader<ITeam[]>
            data={teams}
            isLoading={isLoading}
            error={error}
          >
            {(data) => (
              <HorizontalListLayout
                identifier="team"
                items={data}
                ItemComponent={TeamPreviewCard}
                additionalProps={{
                  Item: TeamPreview,
                  imageProportion: 2,
                  minWidth: scaleSize(320),
                }}
              />
            )}
          </SkeletonLoader>
        </VStack>
        <VStack mt={"$4"} mb={"$8"} space="sm">
          <HStack mx={"$4"}>
            <Heading size="lg" color="$red500">
              Following{" "}
            </Heading>
            <Heading size="lg">Athletes</Heading>
          </HStack>
          <FollowingAthletesList />
        </VStack>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(Followings);
