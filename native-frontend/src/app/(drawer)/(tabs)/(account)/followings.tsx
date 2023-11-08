import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import AthletesPageTitle from "@Components/athletes/AthletesPageTitle";
import Container from "@Components/common/Container";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import UserCard from "@Components/user/UserCard";
import { teams, users } from "@Constants/dummy-data";
import { Box, HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";

const Followings = () => {
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
              left={"-$16"}
            >
              <LogoTitle {...props} />
              <Box width={"95%"}>
                <AthletesPageTitle />
              </Box>
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
          <Container>
            {users.map((user, i) => (
              <UserCard
                user={user}
                key={user.id}
                isLastElement={i === users.length - 1}
              />
            ))}
          </Container>
        </VStack>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(Followings);
