import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import RaceCard from "@Components/race/RaceCard";
import { events } from "@Constants/dummy-data";
import { Heading, VStack } from "@gluestack-ui/themed";
import { RaceWithCheckIn } from "@lib/models";
import { useGetRacesByEventQuery } from "@lib/races/services/raceService";
import { getNamedDate } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const Timetable = () => {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();

  const { data: races, isLoading } = useGetRacesByEventQuery(eventId);
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <VStack
              space={"md"}
              alignItems="center"
              w={"$full"}
              left={"-$16"}
              pb={"$3"}
            >
              <HeaderSubtitledTitle
                title={"Timetable"}
                subtitle="Brussels mile"
                tintColor={tintColor}
              />
            </VStack>
          ),
        }}
      />
      <VStack>
        <Heading size={"sm"} textAlign="center" my={"$2"}>
          {races?.[0].event.startDateTime &&
            getNamedDate(races[0].event.startDateTime)}
        </Heading>
        <VStack>
          <Heading mx={"$4"} size={"lg"} py={"$1"}>
            Races
          </Heading>
          <Container>
            <SkeletonLoader<RaceWithCheckIn[]> data={races}>
              {(data) =>
                data.map((race, i) => (
                  <RaceCard
                    key={race.id}
                    race={race}
                    registrationAvailable={race.availableForCheckIn}
                    eventId={events[0].id}
                    isLast={i === data.length - 1}
                  />
                ))
              }
            </SkeletonLoader>
          </Container>
        </VStack>
      </VStack>
    </>
  );
};

export default withWatermarkBg(Timetable);
