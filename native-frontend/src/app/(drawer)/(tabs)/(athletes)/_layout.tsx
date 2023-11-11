import SearchTitle from "@Components/common/SearchTitle";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          title: "Ace Battle Mile",
          headerTitle: (props) => (
            <SearchTitle
              link={"/(modals)/(find)/find-athlete"}
              placeholder="Search for an athlete..."
            />
          ),
        }}
      />
      <Stack.Screen
        name="[userId]"
        options={{
          headerTitle: "Athelte page",
        }}
      />
    </Stack>
  );
};

export default Layout;
