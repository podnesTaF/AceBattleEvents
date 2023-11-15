import SearchTitle from "@Components/common/SearchTitle";
import EventCard from "@Components/events/EventCard";
import RegistrationsSection from "@Components/events/RegistrationsSection";
import UpcomingEventCard from "@Components/events/UpcomingEventCard";
import { events } from "@Constants/dummy-data";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const EventsScreen = () => {
  const user = useAppSelector(selectUser);
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
      <ScrollView>
        <VStack mx={"$3"} mb={"$12"} space="lg" mt={"$4"}>
          <Heading size={"lg"}>Upcoming Events</Heading>
          <UpcomingEventCard />
        </VStack>
        <Box p={"$3"}>
          <Heading size={"lg"}>Your Registrations</Heading>
          <RegistrationsSection user={user} events={events} />
        </Box>
        <VStack space="md" mb={"$1/3"}>
          <Heading mx={"$4"} size="lg">
            Past Events
          </Heading>
          <Box p={"$3"} bg={"$white"}>
            <EventCard event={events[0] as any} />
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
};

export default EventsScreen;
