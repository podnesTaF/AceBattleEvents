import Container from "@Components/common/Container";
import { Center, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { IRunnerResult } from "@lib/models";
import { msToMinutesAndSeconds } from "@lib/utils";
import { Link } from "expo-router";
import React from "react";

type PairCardProps = {
  runnerResults: IRunnerResult[];
  finalResultInMs: number;
  category: string;
};

const PairCard = ({
  runnerResults,
  finalResultInMs,
  category,
}: PairCardProps): JSX.Element => {
  return (
    <Container vertical>
      <HStack p={"$2"} alignItems="center">
        <VStack flex={1} space={"sm"}>
          <Heading size="sm" textTransform="uppercase">
            Runners
          </Heading>
          {runnerResults.map((runnerResult, index) => (
            <Link
              key={runnerResult.id}
              href={`/(modals)/(profile)/${runnerResult.runner.user.id}`}
            >
              <Heading color={"$coolGray400"} size="sm">
                {runnerResult.runner.user.name +
                  " " +
                  runnerResult.runner.user.surname +
                  " (" +
                  runnerResult.runnerType.slice(0, -2) +
                  ")"}
              </Heading>
            </Link>
          ))}
          <Heading size="sm" textTransform="uppercase">
            Result:
          </Heading>
          <Heading size="sm" textAlign="center">
            {msToMinutesAndSeconds(finalResultInMs)}
          </Heading>
        </VStack>
        <Center flex={1}>
          <Heading size={"lg"} textTransform="uppercase">
            {category === "male" ? "Men" : "Women"}
          </Heading>
        </Center>
      </HStack>
    </Container>
  );
};

export default PairCard;
