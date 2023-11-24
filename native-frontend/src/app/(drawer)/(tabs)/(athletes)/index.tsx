import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthletePreviewCard from "@Components/athletes/AthletePreviewCard";
import Container from "@Components/common/Container";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import InfoTemplate from "@Components/common/InfoTemplate";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import UserCard from "@Components/user/UserCard";
import { users } from "@Constants/dummy-data";
import { HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { useGetTopTeamsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { useGetTopAthletesQuery } from "@lib/user/services/RunnerService";
import React from "react";

const Athletes = () => {
  const {
    data: athletes,
    error,
    isLoading: isAthletesLoading,
  } = useGetTopAthletesQuery({ top: 2 });

  const {
    data: teams,
    error: teamsError,
    isLoading: isTeamsLoading,
  } = useGetTopTeamsQuery({});

  const user = useAppSelector(selectUser);

  return (
    <ScrollView bg={"$fff9ff"}>
      <VStack my={"$4"} space="sm">
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
              items={[...teams?.male, ...teams?.female]}
              ItemComponent={TeamPreviewCard}
              additionalProps={{
                Item: TeamPreview,
                imageProportion: 3,
                minWidth: 340,
              }}
            />
          )}
        </WithLoading>
      </VStack>
      <VStack my={"$4"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">Top </Heading>
          <Heading size="lg" color="$red500">
            AB{" "}
          </Heading>
          <Heading size="lg">Runners</Heading>
        </HStack>
        <WithLoading isLoading={!athletes || isAthletesLoading}>
          <HorizontalListLayout
            identifier="runner"
            items={[...(athletes?.male || []), ...(athletes?.female || [])]}
            ItemComponent={AthletePreviewCard}
          />
        </WithLoading>
      </VStack>
      <VStack mt={"$4"} mb={"$8"} space="sm">
        <HStack mx={"$4"}>
          <Heading size="lg">Your </Heading>
          <Heading size="lg" color="$red500">
            Followings
          </Heading>
        </HStack>

        {user ? (
          <Container vertical>
            {users.map((userData, i) => (
              <UserCard
                isAuthorized={true}
                user={userData as any}
                key={userData.id}
                isLastElement={i === users.length - 1}
              />
            ))}
          </Container>
        ) : (
          <InfoTemplate
            title={"Please Authorize"}
            text={"Authorize to see your followings"}
          />
        )}
      </VStack>
    </ScrollView>
  );
};

export default withWatermarkBg(Athletes);
