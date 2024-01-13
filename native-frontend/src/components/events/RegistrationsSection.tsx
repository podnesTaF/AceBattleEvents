import InfoTemplate from "@Components/common/InfoTemplate";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import { Box, HStack, Icon, Text } from "@gluestack-ui/themed";
import { ITeamRegistration, IUser, IViewer } from "@lib/models";
import { scaleSize } from "@lib/utils";
import { InfoIcon } from "lucide-react-native";
import React from "react";

interface RegistrationSectionProps {
  user: IUser;
  spectatorRegistrations?: IViewer[];
  teamRegistrations?: ITeamRegistration[];
}

const RegistrationsSection: React.FC<RegistrationSectionProps> = ({
  user,
  spectatorRegistrations,
  teamRegistrations,
}) => {
  // spectator - IViewer
  // manager - find all team registrations
  // runner - find all team registrations

  // fecth registrations by user, if logged in
  if (user.role === "manager" || user.role === "runner") {
    return (
      <>
        {teamRegistrations?.length ? (
          teamRegistrations.map((reg) => (
            <TeamRegistrationCard
              key={reg.id}
              event={reg.event}
              team={reg.team}
            />
          ))
        ) : user.role === "runner" ? (
          <HStack py={"$3"} space={"md"} alignItems="center">
            <Icon as={InfoIcon} size={"lg"} color="$primary400" />
            <Text size="lg">
              You haven't been registered as a runner to any events yet. Ask
              your manager your status
            </Text>
          </HStack>
        ) : (
          <HStack
            py={"$3"}
            space={"md"}
            alignItems="center"
            width={scaleSize(250)}
          >
            <Icon as={InfoIcon} size={"lg"} color="$primary400" />
            <Text size="lg">You haven't registered any of your teams</Text>
          </HStack>
        )}
      </>
    );
  }

  if (user.role === "spectator") {
    <>
      <Box w={"auto"} h={"$24"}>
        <InfoTemplate
          title="Empty"
          text="You haven't registered to attend any events yet"
        />
      </Box>
    </>;
  }

  return (
    <>
      <Box h={"$24"}>
        <InfoTemplate
          height={"auto"}
          title="Empty"
          text="You haven't registered to attend any events yet"
        />
      </Box>
    </>
  );
};

export default RegistrationsSection;
