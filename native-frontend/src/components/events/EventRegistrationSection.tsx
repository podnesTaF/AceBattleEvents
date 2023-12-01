import InfoTemplate from "@Components/common/InfoTemplate";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import { EventInfo, IUser } from "@lib/models";
import { formatDate } from "@lib/utils";
import { Link, useRouter } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

interface Props {
  user?: IUser | null;
  event: EventInfo;
}

const EventRegistrationSection: React.FC<Props> = ({ user, event }) => {
  const router = useRouter();

  // fetch user status for current competition. Handle by state

  if (!event.isOpenToRegister) {
    return (
      <VStack space="lg" p={"$3"} bg={"$white"}>
        <Heading size={"lg"}>Registrations</Heading>
        <InfoTemplate
          title="Registrations are closed"
          text="You can't register to this event anymore."
        />
      </VStack>
    );
  }

  if (user?.role === "spectator") {
    return (
      <VStack space="lg" p={"$3"} bg={"$white"}>
        <Heading size={"lg"}>Attend the Event</Heading>
        {event.attendanceType === "free" ? (
          <InfoTemplate
            type="success"
            title={"The Event is free to visit"}
            text={"You can come without any registrations"}
          />
        ) : (
          <>
            <HStack space="md" alignItems="center">
              <Icon as={InfoIcon} color={"$primary400"} />
              <Text>
                {event.isRegisteredToVisit
                  ? "You are registered for this event"
                  : "Registrations are open"}
              </Text>
            </HStack>
            <Box w={"$full"} alignItems="center">
              {event.isRegisteredToVisit ? (
                <Link href={"/(drawer)/(tabs)/(account)/calendar"} asChild>
                  <Button>
                    <ButtonText>View in calendar</ButtonText>
                  </Button>
                </Link>
              ) : (
                <Link href={"/(modals)/(event)/attend-event"} asChild>
                  <Button>
                    <ButtonText>Visit the event</ButtonText>
                  </Button>
                </Link>
              )}
            </Box>
          </>
        )}
      </VStack>
    );
  }
  if (user?.role === "manager") {
    return (
      <VStack space="lg" p={"$3"} bg={"$white"}>
        <Heading size={"lg"}>Register your team</Heading>
        <HStack space="md" alignItems="center">
          <Icon as={InfoIcon} color={"$primary400"} />
          <Text>Registrations are open</Text>
        </HStack>
        {!event.allTeamsRegistered ? (
          <Link
            href={{
              pathname: "/(modals)/(event)/register-team",
              params: { eventId: event.id + "" },
            }}
            asChild
          >
            <Button>
              <ButtonText>Register Teams</ButtonText>
            </Button>
          </Link>
        ) : (
          <Heading size={"sm"} textAlign="center" color={"$coolGray400"}>
            You registered all your teams
          </Heading>
        )}
        {event.managerTeamRegistrations && (
          <VStack my={"$2"} space="md">
            <Heading size={"md"}>Registered Teams:</Heading>
            {!event.managerTeamRegistrations.length ? (
              <Heading size={"sm"} color={"$coolGray300"}>
                No teams registered yet
              </Heading>
            ) : (
              event.managerTeamRegistrations.map((registration) => (
                <HStack
                  key={registration.id}
                  space="lg"
                  justifyContent="space-between"
                >
                  <Heading size="sm">{registration.team.name}</Heading>
                  <Heading size={"sm"} color={"$coolGray300"}>
                    {formatDate(registration.createdAt)}
                  </Heading>
                </HStack>
              ))
            )}
          </VStack>
        )}
      </VStack>
    );
  }
};

export default EventRegistrationSection;
