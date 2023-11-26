import WithLoading from "@Components/HOCs/withLoading";
import Container from "@Components/common/Container";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import {
  useGetRunnersByManagerQuery,
  useGetTeamsByManagerQuery,
} from "@lib/services";
import React from "react";
import UserCard from "../UserCard";

const TeamsAndRunners = ({ user }: { user: IUser }): JSX.Element => {
  const { data: teams, isLoading: isTeamsLoading } = useGetTeamsByManagerQuery(
    user?.id
  );
  const { data: runners, isLoading: isRunnerLoading } =
    useGetRunnersByManagerQuery(user.manager?.id);

  return (
    <ScrollView>
      <VStack my={"$4"}>
        <HStack mx={"$4"}>
          <Heading size="lg">Top </Heading>
          <Heading size="lg" color="$red500">
            AB{" "}
          </Heading>
          <Heading size="lg">Teams</Heading>
        </HStack>
        <WithLoading isLoading={!teams || isTeamsLoading}>
          {teams && (
            <HorizontalListLayout
              identifier="team"
              items={teams}
              ItemComponent={TeamPreviewCard}
              additionalProps={{
                Item: TeamPreview,
                imageProportion: 3,
              }}
            />
          )}
        </WithLoading>
      </VStack>
      <VStack space={"lg"}>
        <Heading mx={"$4"} size="lg">
          Runners
        </Heading>
        <WithLoading isLoading={isRunnerLoading || !runners}>
          <Container>
            {runners?.map((runner, i) => (
              <UserCard
                user={runner.user}
                runnerPreview={runner}
                key={runner.id}
                isLastElement={i === runners.length - 1}
              />
            ))}
          </Container>
        </WithLoading>
      </VStack>
    </ScrollView>
  );
};

export default TeamsAndRunners;
