import { View, Text } from "react-native";
import React from "react";
import { Box, FlatList, Heading, VStack, Image } from "@gluestack-ui/themed";
import UserCard from "@Components/user/UserCard";
import { users } from "@Constants/dummy-data";
import Container from "@Components/common/Container";

const RunnersTab = ({ team }: { team: any }) => {
  return (
    <VStack p={"$3"} space="lg">
      <VStack>
        <Heading size="sm" mb={"$2"}>
          Coaches
        </Heading>
        <Container>
          <UserCard description="Coach of the Kyiv-men" user={team.coach} />
        </Container>
      </VStack>
      <VStack>
        <Heading size={"sm"} mb={"$2"}>
          Runners
        </Heading>
        <Container>
          <FlatList
            data={users}
            renderItem={({ item }) => <UserCard user={item} />}
            keyExtractor={(item: any) => item.id}
          />
        </Container>
      </VStack>
    </VStack>
  );
};

export default RunnersTab;
