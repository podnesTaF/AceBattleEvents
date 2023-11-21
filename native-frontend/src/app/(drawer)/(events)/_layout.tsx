import { Stack } from "expo-router";
import React from "react";

const EventLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name={"events"} />
      </Stack>
    </>
  );
};

export default EventLayout;
