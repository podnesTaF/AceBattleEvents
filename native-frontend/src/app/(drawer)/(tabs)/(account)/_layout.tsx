import { Stack } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

const AccountLayout = () => {
  const [user, setUser] = useState();

  if (user) {
    return (
      <SafeAreaView>
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
