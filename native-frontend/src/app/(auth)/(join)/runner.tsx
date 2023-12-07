import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import RunnerJoinForm from "@Components/join/RunnerJoinForm";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";

const RunnerJoin = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: ({ tintColor }) => (
            <Box w={"$full"} ml={"-$12"}>
              <HeaderSubtitledTitle
                tintColor={tintColor}
                subtitle="Ace Battle Mile"
                title="Runner Registration"
              />
            </Box>
          ),
        }}
      />
      <VStack
        h={"$full"}
        alignItems="center"
        py={"$4"}
        justifyContent="space-between"
      >
        <Box maxWidth={360} w={"$full"} py={"$4"} mx={"auto"}>
          <RunnerJoinForm />
        </Box>
        <Box mx={"auto"} maxWidth={350} px={"$2"}>
          <Text color={"$coolGray400"} textAlign="center">
            *To become a runner, coach and/or manager, you have to create a user
            account first.
          </Text>
        </Box>
      </VStack>
    </>
  );
};

export default RunnerJoin;
