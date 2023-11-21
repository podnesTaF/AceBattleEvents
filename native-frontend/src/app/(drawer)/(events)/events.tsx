import WithLoading from "@Components/HOCs/withLoading";
import Container from "@Components/common/Container";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import SearchTitle from "@Components/common/SearchTitle";
import EventCard from "@Components/events/EventCard";
import RegistrationsSection from "@Components/events/RegistrationsSection";
import UpcomingEventCard from "@Components/events/UpcomingEventCard";
import { events } from "@Constants/dummy-data";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { useFetchFutureEventsQuery } from "@lib/events/services";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const EventsScreen = () => {
  const user = useAppSelector(selectUser);
  const { data: futureEvents, error, isLoading } = useFetchFutureEventsQuery();
  return (
    <Box bgColor="#fff9ff">
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
        <VStack mx={"$3"} mt={"$4"}>
          <Heading size={"lg"}>Upcoming Events</Heading>
          <WithLoading isLoading={isLoading}>
            <HorizontalListLayout
              identifier="event"
              items={futureEvents}
              ItemComponent={UpcomingEventCard}
              isLoading={isLoading}
              wrapperProps={{
                pb: "$12",
              }}
            />
          </WithLoading>
        </VStack>
        <Box bg={"$white"}>
          <Container vertical>
            <Box px={"$2"} py={"$4"}>
              <Heading size={"lg"} mb={"$4"}>
                Your Registrations
              </Heading>
              <RegistrationsSection user={user} events={events} />
            </Box>
          </Container>
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
    </Box>
  );
};

export default EventsScreen;
