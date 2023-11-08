import EventCard from "@Components/events/EventCard";
import { HStack, Heading, Text } from "@gluestack-ui/themed";
import { IEvent, ITeam } from "@lib/models";
import React from "react";

interface Props {
  event: IEvent;
  team: ITeam;
}

const TeamRegistrationCard: React.FC<Props> = ({ event, team }) => {
  return (
    <EventCard event={event}>
      <HStack justifyContent="space-between" space="md">
        <Text size={"md"}>Team</Text>
        <Heading size={"md"}>{team.name}</Heading>
      </HStack>
    </EventCard>
  );
};

export default TeamRegistrationCard;
