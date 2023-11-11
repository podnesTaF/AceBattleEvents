import SearchTitle from "@Components/common/SearchTitle";
import { Stack } from "expo-router";
import React from "react";

const EventsScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTitle: () => (
            <SearchTitle
              link="/(modals)/(find)/find-event"
              placeholder="Search for an event..."
            />
          ),
        }}
      />
    </>
  );
};

export default EventsScreen;
