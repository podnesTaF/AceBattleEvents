import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const JoinLayout = () => {
  return (
    <>
      <StatusBar style={"dark"} />
      <Stack>
        <Stack.Screen name={"index"} />
        <Stack.Screen name={"user"} />
        <Stack.Screen name={"runner"} />
        <Stack.Screen name={"manager"} />
      </Stack>
    </>
  );
};

export default JoinLayout;
