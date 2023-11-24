import WithLoading from "@Components/HOCs/withLoading";
import SearchBar from "@Components/common/SearchBar";
import UserCard from "@Components/user/UserCard";
import { Box, Heading, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useAppSelector, useDebounce } from "@lib/hooks";
import { useGetRunnerPreviewsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { Stack, useNavigation } from "expo-router";
import React, { useState } from "react";

const FindAthelteModal = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [debouncedQuery, isDebouncing] = useDebounce(query, 500);
  const user = useAppSelector(selectUser);
  const {
    data: runnersData,
    error,
    isLoading: isRunnersLoading,
    isFetching,
  } = useGetRunnerPreviewsQuery({
    type: "search",
    query: debouncedQuery,
    limit: 20,
    authId: user?.id,
  });

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
                Find Athlete
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
      <Box flex={1} bg={"$coolGray100"}>
        {query.length ? (
          <ScrollView p={"$4"}>
            <Box mb={"$4"}>
              <Heading>Runners</Heading>
              <WithLoading
                isLoading={isRunnersLoading || isFetching || isDebouncing}
              >
                <VStack>
                  {runnersData?.runners?.map((runner, i) => (
                    <UserCard
                      key={runner.id}
                      user={runner.user}
                      runnerPreview={runner}
                      isAuthorized={!!user}
                    />
                  ))}
                </VStack>
              </WithLoading>
            </Box>
          </ScrollView>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Heading size={"xl"} color={"$coolGray800"}>
              Look for an athlete or team
            </Heading>
            <Text>Fun Fact</Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default FindAthelteModal;
