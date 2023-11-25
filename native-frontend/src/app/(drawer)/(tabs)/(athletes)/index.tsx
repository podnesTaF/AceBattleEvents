import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthletePreviewCard from "@Components/athletes/AthletePreviewCard";
import FollowingAthletesList from "@Components/athletes/FollowingAthletesList";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import InfoTemplate from "@Components/common/InfoTemplate";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { useGetTopTeamsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { useGetTopAthletesQuery } from "@lib/user/services/RunnerService";
import React from "react";

const Athletes = () => {
  const user = useAppSelector(selectUser);

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
          <FollowingAthletesList />
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
