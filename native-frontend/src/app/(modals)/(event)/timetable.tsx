import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import RaceCard from "@Components/race/RaceCard";
import { races } from "@Constants/dummy-data";
import { Heading, VStack } from "@gluestack-ui/themed";
import { getNamedDate } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";

const Timetable = () => {
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
          {getNamedDate(races[0].startTime)}
        </Heading>
        <VStack>
          <Heading mx={"$4"} size={"lg"} py={"$1"}>
            Races
          </Heading>
          <Container>
            {races.map((race, i) => (
              <RaceCard
                key={race.id}
                race={race}
                isLast={i === races.length - 1}
              />
            ))}
          </Container>
        </VStack>
      </VStack>
    </>
  );
};

export default withWatermarkBg(Timetable);
