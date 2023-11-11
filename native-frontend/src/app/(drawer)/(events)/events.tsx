import Container from "@Components/common/Container";
import SearchTitle from "@Components/common/SearchTitle";
import EventCard from "@Components/events/EventCard";
import RegistrationsSection from "@Components/events/RegistrationsSection";
import UpcomingEventCard from "@Components/events/UpcomingEventCard";
import { events, testUserSpectator } from "@Constants/dummy-data";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const EventsScreen = () => {
  const [user, setUser] = React.useState(testUserSpectator);
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
        <VStack mx={"$3"} mb={"$4"} space="lg">
          <Heading size={"lg"} textTransform="uppercase" fontWeight="bold">
            Upcoming Events
          </Heading>
          <UpcomingEventCard />
        </VStack>
        <Container vertical>
          <Box p={"$3"}>
            <Heading size={"lg"} textTransform="uppercase" fontWeight="bold">
              Your Registrations
            </Heading>
            <RegistrationsSection user={user} events={events} />
          </Box>
        </Container>
        <VStack space="md" mb={"$1/3"}>
          <Heading size="lg">Past Events</Heading>
          <Container>
            <EventCard event={events[0] as any} />
          </Container>
        </VStack>
      </ScrollView>
    </>
  );
};

export default EventsScreen;
