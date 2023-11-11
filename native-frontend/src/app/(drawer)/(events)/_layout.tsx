import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const EventLayout = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name={"events"} />
      </Stack>
    </>
  );
};

export default EventLayout;
