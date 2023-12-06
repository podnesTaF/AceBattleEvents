import InfoTemplate from "@Components/common/InfoTemplate";
import SearchBar from "@Components/common/SearchBar";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import EventCard from "@Components/events/EventCard";
import { Center, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useGetAllEventsQuery } from "@lib/events/services";
import { IEvent } from "@lib/models";
import { Stack } from "expo-router";
import React, { useState } from "react";

const FindEventModal = () => {
  const [query, setQuery] = useState("");
  const {
    data: pastEvents,
    isLoading: isLoadingPastEvents,
    error: errorPastEvents,
  } = useGetAllEventsQuery(`finished=true&name=${query}`);
  const {
    data: futureEvents,
    isLoading: isLoadingFutureEvents,
    error: errorFutureEvents,
  } = useGetAllEventsQuery(`name=${query}`);

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

      {query ? (
        <ScrollView>
          <VStack p={"$4"} space={"md"}>
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
                  isLoading={
                    title === "Upcoming"
                      ? isLoadingFutureEvents
                      : isLoadingPastEvents
                  }
                  error={
                    title === "Upcoming" ? errorFutureEvents : errorPastEvents
                  }
                >
                  {(data) => (
                    <VStack w={"$full"} space="md">
                      {data.length ? (
                        data.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))
                      ) : (
                        <InfoTemplate
                          variant="outline"
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
      ) : (
        <Center flex={1}>
          <Heading size="md" color="$coolGray500">
            Search for an event by title
          </Heading>
        </Center>
      )}
    </>
  );
};

export default FindEventModal;
