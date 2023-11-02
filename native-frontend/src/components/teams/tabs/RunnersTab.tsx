import { View, Text } from "react-native";
import React from "react";
import { Box, FlatList, Heading, VStack, Image } from "@gluestack-ui/themed";
import UserCard from "@Components/user/UserCard";
import { users } from "@Constants/dummy-data";

const RunnersTab = ({ team }: { team: any }) => {
  return (
    <VStack p={"$3"} space="lg">
      <VStack>
        <Heading size="sm" mb={"$2"}>
          Coaches
        </Heading>
        <VStack
          px={"$3"}
          width={"$full"}
          borderColor="$red500"
          bgColor="$white"
          borderTopWidth={3}
          borderBottomWidth={3}
        >
          <UserCard description="Coach of the Kyiv-men" user={team.coach} />
        </VStack>
      </VStack>
      <VStack>
        <Heading size={"sm"} mb={"$2"}>
          Runners
        </Heading>
        <VStack
          px={"$3"}
          width={"$full"}
          borderColor="$red500"
          bgColor="$white"
          borderTopWidth={3}
          borderBottomWidth={3}
        >
          <FlatList
            data={users}
            renderItem={({ item }) => <UserCard user={item} />}
            keyExtractor={(item: any) => item.id}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default RunnersTab;
