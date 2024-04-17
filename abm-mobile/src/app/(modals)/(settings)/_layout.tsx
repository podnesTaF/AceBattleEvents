import { Stack } from "expo-router";
import React from "react";

const SettingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name={"index"}
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name={"(main)"}
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SettingLayout;
