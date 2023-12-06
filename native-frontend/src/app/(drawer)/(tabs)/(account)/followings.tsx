import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import FollowingAthletesList from "@Components/athletes/FollowingAthletesList";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { teams } from "@Constants/dummy-data";
import { HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { Stack } from "expo-router";
import React from "react";

const Followings = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerTitle: (props) => (
            <VStack
              alignItems="center"
              width={"100%"}
              space="md"
              top={"$4"}
              pb={"$6"}
              left={"-$20"}
            >
              <LogoTitle {...props} />
              <Heading size="sm" color="$coolGray200">
                Followings
              </Heading>
            </VStack>
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
          <HorizontalListLayout
            identifier="team"
            items={teams}
            ItemComponent={TeamPreviewCard}
            additionalProps={{
              Item: TeamPreview,
              imageProportion: 3,
              minWidth: 340,
            }}
          />
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
