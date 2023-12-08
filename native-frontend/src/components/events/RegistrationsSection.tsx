import Container from "@Components/common/Container";
import InfoTemplate from "@Components/common/InfoTemplate";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import { teams } from "@Constants/dummy-data";
import { Box, HStack, Icon, Text } from "@gluestack-ui/themed";
import { IEvent } from "@lib/models";
import { InfoIcon } from "lucide-react-native";
import React from "react";

interface RegistrationSectionProps {
  user: any;
  events: IEvent[];
}

const RegistrationsSection: React.FC<RegistrationSectionProps> = ({
  user,
  events,
}) => {
  // fecth registrations by user, if logged in
  if (user.role === "manager") {
    return (
      <>
        {events.length ? (
          events.map((event) => (
            <TeamRegistrationCard
              key={event.id}
              event={event}
              team={teams[0]}
            />
          ))
        ) : (
          <Container>
            <HStack py={"$3"} space={"md"}>
              <Icon as={InfoIcon} size={"lg"} color="$primary400" />
              <Text size="lg">You haven't registered any of your teams</Text>
            </HStack>
          </Container>
        )}
      </>
    );
  }

  if (user.role === "runner") {
    return (
      <>
        {events.length ? (
          events.map((event) => (
            <TeamRegistrationCard event={event} team={teams[0]} />
          ))
        ) : (
          <HStack py={"$3"} space={"md"}>
            <Icon as={InfoIcon} size={"lg"} color="$primary400" />
            <Text size="lg">
              You haven't been registered as a runner to any events yet. Ask
              your manager your status
            </Text>
          </HStack>
        )}
      </>
    );
  }

  return (
    <>
      <Box h={"$24"}>
        <InfoTemplate text="You haven't registered to attend any events yet" />
      </Box>
    </>
  );
};

export default RegistrationsSection;
