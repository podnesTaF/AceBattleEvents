import AbmButton from "@Components/common/buttons/AbmButton";
import LastEventCard from "@Components/events/LastEventCard";
import { events } from "@Constants/dummy-data";
import { Box, HStack, Heading, ScrollView } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { ITeam } from "@lib/models";
import { useFollowTeamMutation, useUnfollowTeamMutation } from "@lib/services";
import { selectIsAuth } from "@lib/store";
import React from "react";
import TeamDescription from "../TeamDescription";
import TeamPreviewCard from "../TeamPreviewCard";

const HomeTeamTab = ({ team }: { team: ITeam }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const [followTeam, { isLoading: isFollowLoading }] = useFollowTeamMutation();
  const [unfollowTeam, { isLoading: isUnfollowing }] =
    useUnfollowTeamMutation();
  const onPress = async () => {
    try {
      if (team.isFollowing) {
        const res = await unfollowTeam(team.id).unwrap();
      } else {
        const res = await followTeam(team.id).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <Box p={"$2"}>
        <HStack alignItems="center" p={"$2"} justifyContent="space-between">
          <Heading size={"lg"}>
            {team.followersCount}{" "}
            {(team.followersCount || 0) > 1 ? "Followers" : "Follower"}
          </Heading>
          {isAuth && (
            <AbmButton
              isLoading={isFollowLoading || isUnfollowing}
              title={team.isFollowing ? "Unfollow" : "Follow"}
              onPress={onPress}
            />
          )}
        </HStack>
        <TeamPreviewCard team={team} Item={TeamDescription} />
        <Box my={"$4"}>
          <Heading size={"lg"} mb={"$2"}>
            Last Event
          </Heading>
          <LastEventCard event={events[0]} height={"$40"} />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default HomeTeamTab;
