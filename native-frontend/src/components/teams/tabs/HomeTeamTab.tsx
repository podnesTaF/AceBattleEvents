import LastEventCard from "@Components/events/LastEventCard";
import { events } from "@Constants/dummy-data";
import { Box, Heading, ScrollView } from "@gluestack-ui/themed";
import { ITeam } from "@lib/models";
import React from "react";
import TeamDescription from "../TeamDescription";
import TeamPreviewCard from "../TeamPreviewCard";

const HomeTeamTab = ({ team }: { team: ITeam }) => {
  return (
    <ScrollView>
      <Box p={"$2"}>
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
