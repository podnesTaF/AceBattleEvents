import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { HStack, Heading, VStack } from "@gluestack-ui/themed";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import { teams, users } from "@Constants/dummy-data";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import TeamPreview from "@Components/teams/TeamPreview";
import UserCard from "../UserCard";
import Container from "@Components/common/Container";

const TeamsAndRunners = () => {
  return (
    <ScrollView>
      <VStack my={"$4"}>
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
          additionalProps={{
            Item: TeamPreview,
            imageProportion: 3,
            minWidth: 340,
          }}
        />
      </VStack>
      <VStack space={"lg"}>
        <Heading size="lg">Runners</Heading>
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
  );
};

export default TeamsAndRunners;
