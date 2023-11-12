import SearchBar from "@Components/common/SearchBar";
import { Center, Heading, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React, { useState } from "react";

const FindEventModal = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerShown: true,
          headerTitle: () => (
            <VStack
              mt={"$4"}
              mb={"$2"}
              width={"100%"}
              ml={"-$10"}
              alignItems="center"
            >
              <Heading size="sm" color="$coolGray200">
                Find Event
              </Heading>
              <SearchBar
                variant="dark"
                placeholder="Search by name..."
                value={query}
                onChange={(text) => setQuery(text)}
              />
            </VStack>
          ),
        }}
      />
      <Center flex={1} bg={"$coolGray100"}>
        <Heading size={"xl"} color={"$coolGray800"}>
          Look for an event
        </Heading>
      </Center>
    </>
  );
};

export default FindEventModal;
