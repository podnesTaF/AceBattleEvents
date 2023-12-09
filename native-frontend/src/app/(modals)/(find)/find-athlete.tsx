import SearchBar from "@Components/common/SearchBar";
import ImageLoader from "@Components/common/states/ImageLoader";
import NoResourceFound from "@Components/common/states/NoResourceFound";
import UserCard from "@Components/user/UserCard";
import {
  Box,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector, useDebounce } from "@lib/hooks";
import { useGetRunnerPreviewsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { scaleSize } from "@lib/utils";
import { Stack, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Dimensions } from "react-native";

const FindAthelteModal = () => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
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
          headerTitle: () => (
            <VStack
              mt={"$4"}
              mb={"$2"}
              left={"-$16"}
              width={width}
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
          <ImageLoader
            isLoading={isRunnersLoading || isFetching || isDebouncing}
            error={error}
          >
            <ScrollView p={"$4"} height={"$full"}>
              <Box mb={"$4"}>
                <Heading>Runners</Heading>
                <VStack>
                  {runnersData?.runners?.length ? (
                    runnersData?.runners?.map((runner, i) => (
                      <UserCard
                        key={runner.id}
                        user={runner.user}
                        runnerPreview={runner}
                        isAuthorized={!!user}
                      />
                    ))
                  ) : (
                    <NoResourceFound
                      title={"No Runners Found"}
                      text={"Please edit filters"}
                    />
                  )}
                </VStack>
              </Box>
            </ScrollView>
          </ImageLoader>
        ) : (
          <Center flex={1}>
            <Image
              source={require("@Assets/images/runners.png")}
              style={{
                width: 80,
                height: 100,
                objectFit: "contain",
              }}
              role={"img"}
              alt={"loading..."}
            />
            <Heading size="lg" color="$coolGray500">
              Look for an athlete or team
            </Heading>
            <Text maxWidth={scaleSize(300)} textAlign="center">
              Search for an athlete or team by first name, last name, or team
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
};

export default FindAthelteModal;
