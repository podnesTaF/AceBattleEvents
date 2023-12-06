import WithLoading from "@Components/HOCs/withLoading";
import Container from "@Components/common/Container";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { Box, HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { ITeam, IUser } from "@lib/models";
import {
  useGetRunnersByManagerQuery,
  useGetTeamsByManagerQuery,
} from "@lib/services";
import { scaleSize } from "@lib/utils";
import React from "react";
import UserCard from "../UserCard";

const TeamsAndRunners = ({ user }: { user: IUser }): JSX.Element => {
  const {
    data: teams,
    isLoading: isTeamsLoading,
    error: teamsError,
  } = useGetTeamsByManagerQuery({
    managerId: user?.id,
  });
  const { data: runners, isLoading: isRunnerLoading } =
    useGetRunnersByManagerQuery(user.manager?.id);

  return (
    <ScrollView>
      <VStack my={"$4"} space={"md"}>
        <HStack mx={"$4"}>
          <Heading size="lg">Manager's </Heading>
          <Heading size="lg">Teams</Heading>
        </HStack>
        <Box alignItems="center" overflow="hidden">
          <SkeletonLoader<ITeam[]>
            data={teams}
            error={teamsError}
            isLoading={isTeamsLoading}
            height={200}
          >
            {(data) =>
              data.map((team) => (
                <Box
                  key={team.id}
                  overflow="hidden"
                  maxWidth={scaleSize(350)}
                  mb={"$4"}
                  maxHeight={"$64"}
                >
                  <TeamPreviewCard
                    team={team}
                    Item={TeamPreview}
                    imageProportion={3}
                    showLink={true}
                  />
                </Box>
              ))
            }
          </SkeletonLoader>
        </Box>
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
