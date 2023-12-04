import { Stack } from "expo-router";
import React from "react";

const FindLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name={"find-athlete"}
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={"find-event"}
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default FindLayout;
