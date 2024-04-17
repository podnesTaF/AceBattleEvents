import Country from "@Components/common/Country";
import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { formatDate, msToMinutesAndSeconds } from "@lib/common/utils";
import { IRunnerResult } from "@lib/models";
import { getMeters, getPace } from "@lib/utils";

import { Link } from "expo-router";
import React from "react";

const JokerResultDetails = ({
  runnerResults,
}: {
  runnerResults: IRunnerResult[];
}) => {
  return (
    <VStack>
      {runnerResults
        .sort((a, b) => a.splits[0].resultInMs - b.splits[0].resultInMs)
        .map((runnerResult: IRunnerResult, i: number) => {
          const isJoker = runnerResult.runnerType.indexOf("joker") !== -1;
          return (
            <VStack
              key={i}
              p={"$2"}
              borderColor="#ff0000"
              bg={isJoker ? "#ff0000" : "$white"}
              borderWidth={1}
              space={"lg"}
              alignItems="center"
              justifyContent="space-between"
            >
              <VStack space="sm" alignItems="center">
                <Link
                  href={`/(modals)/(profile)/${runnerResult.runner.user.id}`}
                >
                  <Heading size={"sm"} color={"$coolGray400"}>
                    {runnerResult.runner.user.name +
                      " " +
                      runnerResult.runner.user.surname}
                  </Heading>
                </Link>
                <HStack
                  justifyContent="space-around"
                  space={"md"}
                  alignItems="center"
                >
                  <VStack alignItems="center">
                    <Heading size="sm" color={"$coolGray400"}>
                      Nat.
                    </Heading>
                    <Country
                      textColor={isJoker ? "$white" : "$black"}
                      country={runnerResult.runner.user.country}
                    />
                  </VStack>
                  <VStack alignItems="center">
                    <Heading color={isJoker ? "$white" : "$black"} size={"sm"}>
                      Date Of Birth
                    </Heading>
                    <Text color={isJoker ? "$white" : "$black"} size={"sm"}>
                      {formatDate(runnerResult.runner.dateOfBirth, false)}
                    </Text>
                  </VStack>
                  <VStack alignItems="center">
                    <Heading color={isJoker ? "$white" : "$black"} size={"sm"}>
                      Pace
                    </Heading>
                    <Text color={isJoker ? "$white" : "$black"} size={"sm"}>
                      {getPace(
                        runnerResult.splits[runnerResult.splits.length - 1]
                          .resultInMs,
                        runnerResult.distance,
                        runnerResult.splits[0]
                      )}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              <VStack space={"sm"} alignItems="center">
                <Heading size={"sm"} color={isJoker ? "$white" : "$black"}>
                  Splits
                </Heading>
                <HStack flexWrap="wrap" justifyContent="center" space="xs">
                  {runnerResult.splits.map((split) => (
                    <Text
                      key={split.id}
                      size={"sm"}
                      textAlign="center"
                      color={isJoker ? "$white" : "$black"}
                      w={"$1/3"}
                    >
                      {getMeters(split.distance)}m:{" "}
                      {msToMinutesAndSeconds(split.resultInMs)}
                    </Text>
                  ))}
                </HStack>
              </VStack>
            </VStack>
          );
        })}
    </VStack>
  );
};

export default JokerResultDetails;
