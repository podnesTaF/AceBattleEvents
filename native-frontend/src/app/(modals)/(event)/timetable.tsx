import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import InfoTemplate from "@Components/common/InfoTemplate";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import RaceCard from "@Components/race/RaceCard";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { RaceWithCheckIn } from "@lib/models";
import { useGetRacesByEventQuery } from "@lib/races/services/raceService";
import { getNamedDate } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const Timetable = () => {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();

  const { data: races, isLoading, error } = useGetRacesByEventQuery(eventId);
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          header: (props) => (
            <SafeAreaView
              style={{
                backgroundColor: "#1C1E1F",
              }}
            >
              <VStack space={"md"} alignItems="center" w={"$full"} pb={"$3"}>
                <HeaderSubtitledTitle
                  title={"Timetable"}
                  subtitle="Brussels mile"
                  tintColor={"#fff"}
                />
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <VStack>
        <Heading size={"sm"} textAlign="center" my={"$2"}>
          {races?.[0]?.event.startDateTime &&
            getNamedDate(races[0].event.startDateTime)}
        </Heading>
        <VStack>
          <Heading mx={"$4"} size={"lg"} py={"$1"}>
            Races
          </Heading>
          <SkeletonLoader<RaceWithCheckIn[]>
            data={races}
            isLoading={isLoading}
            error={error}
          >
            {(data) =>
              data.length ? (
                <Container>
                  {data.map((race, i) => (
                    <RaceCard
                      key={race.id}
                      race={race}
                      registrationAvailable={race.availableForCheckIn}
                      isLast={i === data.length - 1}
                    />
                  ))}
                </Container>
              ) : (
                <Box mx={"$4"}>
                  <InfoTemplate
                    variant="outline"
                    title="No Races Yet for this event"
                    text="The races will be available soon. Stay tuned!"
                  />
                </Box>
              )
            }
          </SkeletonLoader>
        </VStack>
      </VStack>
    </>
  );
};

export default withWatermarkBg(Timetable);
