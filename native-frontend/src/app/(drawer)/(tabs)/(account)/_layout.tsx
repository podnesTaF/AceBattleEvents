import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountLayout = () => {
  const [user, setUser] = useState();

  if (user) {
    return (
      <SafeAreaView>
        <StatusBar style={"light"} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#1C1E1F",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen name={"index"} />
          <Stack.Screen name={"followings"} />
          <Stack.Screen name={"calendar"} />
          <Stack.Screen
            name={"manage-team"}
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen name={"teams-setting"} />
        </Stack>
      </SafeAreaView>
    );
  }
  return (
    <Stack>
      <Stack.Screen
        name={"index"}
        options={{
          headerTitle: "Login to see",
        }}
      />
    </Stack>
  );
};

export default AccountLayout;
