import withWatermarkBg from "@Components/HOCs/withWatermark";
import SearchBar from "@Components/common/SearchBar";
import ImageLoader from "@Components/common/states/ImageLoader";
import NoResourceFound from "@Components/common/states/NoResourceFound";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import EventCard from "@Components/events/EventCard";
import {
  Box,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetAllEventsQuery } from "@lib/events/services";
import { useScreenSize } from "@lib/hooks";
import { IEvent } from "@lib/models";
import { scaleSize } from "@lib/utils";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Platform } from "react-native";

const FindEventModal = () => {
  const [query, setQuery] = useState("");
  const {
    data: pastEvents,
    isLoading: isLoadingPastEvents,
    isFetching: isFetchingPastEvents,
    error: errorPastEvents,
  } = useGetAllEventsQuery(`finished=true&name=${query}`);
  const {
    data: futureEvents,
    isLoading: isLoadingFutureEvents,
    isFetching: isFetchingFutureEvents,
    error: errorFutureEvents,
  } = useGetAllEventsQuery(`name=${query}`);

  const { isSmallScreen } = useScreenSize();

  const width = Dimensions.get("window").width;

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
              left={Platform.OS === "ios" ? "-$2" : "-$16"}
              width={width}
              alignItems="center"
            >
              <Heading size="sm" color="$coolGray200">
                Find Event
              </Heading>
              <Box w={"$full"}>
                <SearchBar
                  variant="dark"
                  placeholder="Search by name..."
                  value={query}
                  onChange={(text) => setQuery(text)}
                />
              </Box>
            </VStack>
          ),
        }}
      />

      {query ? (
        <ImageLoader
          isLoading={
            isLoadingPastEvents ||
            isLoadingFutureEvents ||
            isFetchingPastEvents ||
            isFetchingFutureEvents
          }
          error={errorPastEvents || errorFutureEvents}
        >
          <ScrollView>
            <VStack p={"$4"} mt={isSmallScreen ? "$6" : "$2"} space={"md"}>
              {["Upcoming", "Past"].map((title, index) => (
                <VStack key={index} space={"md"} alignItems="center">
                  <Heading size="md" color="$coolGray500">
                    {title}
                  </Heading>
                  <SkeletonLoader<IEvent[]>
                    data={
                      title === "Upcoming"
                        ? futureEvents?.events
                        : pastEvents?.events
                    }
                    isLoading={false}
                  >
                    {(data) => (
                      <VStack w={"$full"} space="md">
                        {data.length ? (
                          data.map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))
                        ) : (
                          <NoResourceFound
                            title={`No ${title} Events Found`}
                            text="Try searching for another event"
                          />
                        )}
                      </VStack>
                    )}
                  </SkeletonLoader>
                </VStack>
              ))}
            </VStack>
          </ScrollView>
        </ImageLoader>
      ) : (
        <Center flex={1}>
          <Image
            source={require("@Assets/images/runners.png")}
            style={{
              width: isSmallScreen ? 50 : 80,
              height: isSmallScreen ? 80 : 100,
              objectFit: "contain",
            }}
            role={"img"}
            alt={"loading..."}
          />
          <Heading size="lg" color="$coolGray500">
            Search for an event by title
          </Heading>
          <Text maxWidth={scaleSize(300)} textAlign="center">
            You can search for an event by typing the title in the search bar
          </Text>
        </Center>
      )}
    </>
  );
};

export default withWatermarkBg(FindEventModal, "#fff9ff");
