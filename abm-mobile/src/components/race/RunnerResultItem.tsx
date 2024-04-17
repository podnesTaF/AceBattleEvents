import Country from "@Components/common/Country";
import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { formatDate, msToMinutesAndSeconds } from "@lib/common/utils";
import { IRunnerResult } from "@lib/models";
import { getMeters, getPace } from "@lib/races/utils/results-handlers";
import React from "react";

type Props = {
  runnerResult: IRunnerResult;
};

const RunnerResultItem = ({ runnerResult }: Props): JSX.Element => {
  return (
    <HStack
      p={"$2"}
      borderColor="#ff0000"
      bg={"$white"}
      borderWidth={1}
      space={"lg"}
      justifyContent="space-between"
    >
      <VStack flex={2} space="sm" alignItems="center">
        <VStack alignItems="center">
          <Heading size="sm" color={"$coolGray400"}>
            Nat.
          </Heading>
          <Country country={runnerResult.runner.user.country} />
        </VStack>
        <VStack alignItems="center">
          <Heading size={"sm"}>Date Of Birth</Heading>
          <Text size={"sm"}>
            {formatDate(runnerResult.runner.dateOfBirth, false)}
          </Text>
        </VStack>
        <VStack alignItems="center">
          <Heading size={"sm"}>Pace</Heading>
          <Text size={"sm"}>
            {getPace(
              runnerResult.splits[runnerResult.splits.length - 1].resultInMs,
              runnerResult.distance,
              runnerResult.splits[0]
            )}
          </Text>
        </VStack>
      </VStack>
      <VStack flex={4} space={"sm"} alignItems="center">
        <Heading size={"sm"}>Splits</Heading>
        <HStack flexWrap="wrap">
          {runnerResult.splits.map((split) => (
            <Text key={split.id} size={"sm"} w={"$1/2"}>
              {getMeters(split.distance)}m:{" "}
              {msToMinutesAndSeconds(split.resultInMs)}
            </Text>
          ))}
        </HStack>
      </VStack>
    </HStack>
  );
};

export default RunnerResultItem;
