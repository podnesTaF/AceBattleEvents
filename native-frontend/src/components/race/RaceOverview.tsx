import MilerCard from "@Components/athletes/MilerCard";
import PairCard from "@Components/athletes/PairCard";
import ResultPodium from "@Components/events/ResultPodium";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { EventResult } from "@lib/models";
import React from "react";

const RaceOverview = ({ eventResult }: { eventResult: EventResult }) => {
  return (
    <>
      <Box my={"$4"}>
        <Heading size={"xl"} mx={"$4"}>
          Winners
        </Heading>
        <VStack
          space="md"
          bg={"#1E1C1F"}
          alignItems="center"
          px={"$6"}
          py={"$4"}
        >
          <ResultPodium podium={eventResult.podium} gender={"male"} />
          <ResultPodium podium={eventResult.podium} gender={"female"} />
        </VStack>
      </Box>
      <VStack px={"$3"} my="$4" space="md">
        <Heading size={"lg"}>Best Mile</Heading>
        {Object.keys(eventResult.bestSportsmen).map((item: any) => (
          <MilerCard
            key={item}
            resultInMs={eventResult.bestSportsmen[item]!.finalResultInMs}
            runner={eventResult.bestSportsmen[item].runner}
          />
        ))}
      </VStack>
      <VStack space="lg">
        {Object.keys(eventResult.bestJokerPair).map((category) => (
          <PairCard
            key={category}
            runnerResults={(eventResult.bestJokerPair as any)[category].runners}
            finalResultInMs={
              (eventResult.bestJokerPair as any)[category].finalResultInMs
            }
            category={category}
          />
        ))}
      </VStack>
    </>
  );
};

export default RaceOverview;
