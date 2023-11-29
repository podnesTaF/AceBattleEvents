import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import AuthCallToAction from "@Components/auth/AuthCallToAction";
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
import { scaleSize } from "@lib/utils";
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
        <VStack my={"$4"}>
          <Heading mx={"$3"} size={"lg"}>
            Upcoming Events
          </Heading>
          <WithLoading isLoading={isLoading}>
            <HorizontalListLayout
              identifier="event"
              items={futureEvents}
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
                <RegistrationsSection user={user} events={events} />
              </Box>
            </Container>
          ) : (
            <AuthCallToAction screen="events" />
          )}
        </Box>
        <VStack
          space="md"
          w={"$full"}
          mb={"$1/3"}
          py={"$3"}
          borderTopRightRadius={200}
          borderBottomRightRadius={100}
          bgColor="#ff0000"
        >
          <Heading color={"$white"} mx={"$4"} size="lg">
            Past Events
          </Heading>
          <Box
            p={"$3"}
            bg={"$white"}
            alignSelf="center"
            borderTopRightRadius={scaleSize(50)}
            borderBottomRightRadius={scaleSize(10)}
            borderTopLeftRadius={scaleSize(80)}
            borderBottomLeftRadius={scaleSize(90)}
            borderWidth={2}
            borderColor="$coolGray200"
            width={scaleSize(360)}
            overflow="hidden"
            pl={scaleSize(32)}
          >
            <EventCard event={events[0] as any} />
            <EventCard isLast={true} event={events[0] as any} />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default withWatermarkBg(EventsScreen, "#fff9ff");
