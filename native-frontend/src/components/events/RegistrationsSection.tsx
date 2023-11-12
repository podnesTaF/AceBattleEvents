import NotAuthTemplate from "@Components/common/NotAuthTemplate";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import SpectatorRegistrationCard from "@Components/user/SpectatorRegistrationCard";
import { teams } from "@Constants/dummy-data";
import { HStack, Icon, Text } from "@gluestack-ui/themed";
import { InfoIcon } from "lucide-react-native";
import React from "react";

interface RegistrationSectionProps {
  user: any;
  events: any[];
}

const RegistrationsSection: React.FC<RegistrationSectionProps> = ({
  user,
  events,
}) => {
  if (user.spectator) {
    return events.length ? (
      events.map((event) => (
        <SpectatorRegistrationCard
          key={event.id}
          event={events[0] as any}
          user={user as any}
        />
      ))
    ) : (
      <HStack py={"$3"} space={"md"}>
        <Icon as={InfoIcon} size={"lg"} color="$primary400" />
        <Text size="lg">You haven't registered to attend any events yet</Text>
      </HStack>
    );
  }

  if (user.manager) {
    events.length ? (
      events.map((event) => (
        <TeamRegistrationCard event={event} team={teams[0]} />
      ))
    ) : (
      <HStack py={"$3"} space={"md"}>
        <Icon as={InfoIcon} size={"lg"} color="$primary400" />
        <Text size="lg">You haven't registered any of your teams</Text>
      </HStack>
    );
  }

  if (user.runner) {
    events.length ? (
      events.map((event) => (
        <TeamRegistrationCard event={event} team={teams[0]} />
      ))
    ) : (
      <HStack py={"$3"} space={"md"}>
        <Icon as={InfoIcon} size={"lg"} color="$primary400" />
        <Text size="lg">
          You haven't been registered as a runner to any events yet. Ask your
          manager your status
        </Text>
      </HStack>
    );
  }

  return <NotAuthTemplate />;
};

export default RegistrationsSection;
