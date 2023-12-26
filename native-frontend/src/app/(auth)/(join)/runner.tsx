import withWatermarkBg from "@Components/HOCs/withWatermark";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import RunnerJoinForm from "@Components/join/RunnerJoinForm";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RunnerJoin = () => {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView>
              <Box w={"$full"}>
                <HeaderSubtitledTitle
                  tintColor={"#000"}
                  subtitle="Ace Battle Mile"
                  title="Runner Registration"
                />
              </Box>
            </SafeAreaView>
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

export default withWatermarkBg(RunnerJoin);
