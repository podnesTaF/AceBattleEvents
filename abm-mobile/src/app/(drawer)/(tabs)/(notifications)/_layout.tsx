import { Stack } from "expo-router";
import React from "react";

const NotificationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name={"notifications"}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name={"[id]"} />
    </Stack>
  );
};

export default NotificationLayout;
