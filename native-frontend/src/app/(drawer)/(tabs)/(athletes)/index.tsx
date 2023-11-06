import React from "react";
import { HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { runners, teams, users } from "@Constants/dummy-data";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import AthletePreviewCard from "@Components/athletes/AthletePreviewCard";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import UserCard from "@Components/user/UserCard";
import TeamPreview from "@Components/teams/TeamPreview";

const Athletes = () => {

  return (
    <ScrollView bg={"$fff9ff"}>
      <VStack my={"$4"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">Top </Heading>
          <Heading size="lg" color="$red500">
            AB{" "}
          </Heading>
          <Heading size="lg">Teams</Heading>
        </HStack>
        <HorizontalListLayout
          identifier="team"
          items={teams}
          ItemComponent={TeamPreviewCard}
          additionalProps={{ Item: TeamPreview, imageProportion: 3, minWidth: 340}}
        />
      </VStack>
      <VStack my={"$4"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">Top </Heading>
          <Heading size="lg" color="$red500">
            AB{" "}
          </Heading>
          <Heading size="lg">Runners</Heading>
        </HStack>
        <HorizontalListLayout
          identifier="runner"
          items={runners}
          ItemComponent={AthletePreviewCard}
        />
      </VStack>
      <VStack mt={"$4"} mb={"$8"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">Your </Heading>
          <Heading size="lg" color="$red500">
            Followings
          </Heading>
        </HStack>
        <VStack
          px={"$3"}
          width={"$full"}
          borderColor="$red500"
          bgColor="$white"
          borderTopWidth={3}
          borderBottomWidth={3}
        >
          {users.map((user, i) => (
            <UserCard
              user={user}
              key={user.id}
              isLastElement={i === users.length - 1}
            />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Athletes;
