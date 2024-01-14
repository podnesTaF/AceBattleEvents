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
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import {
  useFetchFutureEventsQuery,
  useGetAllEventsQuery,
} from "@lib/events/services";
import { useAppSelector } from "@lib/hooks";
import { IEvent } from "@lib/models";
import { useFetchSpectatorRegistrationsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { useFindUserRegistrationsQuery } from "@lib/teams/services/teamRegistrationService";
import { mapFutureEvents } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const EventsScreen = () => {
  const user = useAppSelector(selectUser);
  const { data: myRegistrations, isLoading: isLoadingRegistrations } =
    useFetchSpectatorRegistrationsQuery();

  const { data: teamUserRegistrations, isLoading: isLoadingTeamUserRegister } =
    useFindUserRegistrationsQuery({ role: user?.role });

  const {
    data: fututeEventsData,
    error,
    isLoading,
  } = useFetchFutureEventsQuery();
  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    error: eventError,
  } = useGetAllEventsQuery("finished=true");
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack my={"$4"}>
          <Heading mx={"$3"} size={"lg"}>
            Upcoming Events
          </Heading>
          <WithLoading isLoading={isLoading}>
            <HorizontalListLayout
              identifier="event"
              items={mapFutureEvents(fututeEventsData)}
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
                <SkeletonLoader<any[]>
                  data={[myRegistrations, teamUserRegistrations]}
                  isLoading={
                    isLoadingTeamUserRegister || isLoadingRegistrations
                  }
                >
                  {(data) => (
                    <RegistrationsSection
                      user={user}
                      spectatorRegistrations={data[0]}
                      teamRegistrations={data[1]}
                    />
                  )}
                </SkeletonLoader>
              </Box>
            </Container>
          ) : (
            <AuthCallToAction screen="events" />
          )}
        </Box>
        <ListStyledWrapper title={"Past Events"}>
          <SkeletonLoader<IEvent[]>
            data={eventsData?.events}
            isLoading={isLoadingEvents}
            error={eventError}
          >
            {(data) =>
              data.map((event, i, arr) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isLast={i === arr.length - 1}
                />
              ))
            }
          </SkeletonLoader>
        </ListStyledWrapper>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(EventsScreen, "#fff9ff");
