import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import { Box, Heading } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";

const AttendEvent = () => {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <HeaderSubtitledTitle
              tintColor={tintColor}
              title={"Attend the event"}
            />
          ),
        }}
      />
      <Box my={"$4"}>
        <Heading size={"lg"}>Spectator registration form</Heading>
      </Box>
    </>
  );
};

export default AttendEvent;
