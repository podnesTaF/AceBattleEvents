import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import UserJoinForm from "@Components/join/UserJoinForm";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";

const JoinUser = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: ({ tintColor }) => (
            <HeaderSubtitledTitle
              subtitle="Ace Battle Mile"
              title="User Registration"
            />
          ),
        }}
      />
      <VStack h={"$full"} justifyContent="space-between">
        <Box maxWidth={400} p={"$4"} mx={"auto"}>
          <UserJoinForm />
        </Box>
        <Box mx={"auto"} maxWidth={350} px={"$2"}>
          <Text color={"$coolGray400"}>
            *To become a runner, coach and/or manager, you have to create a user
            account first.
          </Text>
        </Box>
      </VStack>
    </>
  );
};

export default JoinUser;
