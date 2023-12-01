import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import AuthCallToAction from "@Components/auth/AuthCallToAction";
import Container from "@Components/common/Container";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import SearchTitle from "@Components/common/SearchTitle";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import ListStyledWrapper from "@Components/common/wrappers/ListStyledWrapper";
import EventCard from "@Components/events/EventCard";
import RegistrationsSection from "@Components/events/RegistrationsSection";
import UpcomingEventCard from "@Components/events/UpcomingEventCard";
import { events } from "@Constants/dummy-data";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { useFetchFutureEventsQuery } from "@lib/events/services";
import { useAppSelector } from "@lib/hooks";
import { IViewer } from "@lib/models";
import { useFetchSpectatorRegistrationsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { mapFutureEvents } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const EventsScreen = () => {
  const user = useAppSelector(selectUser);
  const { data: myRegistrations, isLoading: isLoadingRegistrations } =
    useFetchSpectatorRegistrationsQuery();
  const { data: eventsData, error, isLoading } = useFetchFutureEventsQuery();
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
        <VStack my={"$4"}>
          <Heading mx={"$3"} size={"lg"}>
            Upcoming Events
          </Heading>
          <WithLoading isLoading={isLoading}>
            <HorizontalListLayout
              identifier="event"
              items={mapFutureEvents(eventsData)}
              ItemComponent={UpcomingEventCard}
              isLoading={isLoading}
            />
          </WithLoading>
        </VStack>
        <Box bg={"$white"} my={"$4"}>
          {user ? (
            <Container vertical>
              <Box px={"$2"} py={"$4"}>
                <Heading size={"lg"} mb={"$4"}>
                  Your Registrations
                </Heading>
                <SkeletonLoader<IViewer[]> data={myRegistrations}>
                  {(data) =>
                    data.map((reg) => (
                      <RegistrationsSection
                        key={reg.id}
                        user={user}
                        events={[]}
                      />
                    ))
                  }
                </SkeletonLoader>
              </Box>
            </Container>
          ) : (
            <AuthCallToAction screen="events" />
          )}
        </Box>
        <ListStyledWrapper title={"Past Events"}>
          <EventCard event={events[0] as any} />
          <EventCard isLast={true} event={events[0] as any} />
        </ListStyledWrapper>
      </ScrollView>
    </Box>
  );
};

export default withWatermarkBg(EventsScreen, "#fff9ff");
