import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import { IEvent, IUser } from "@lib/models";
import { Link } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

interface Props {
  user?: IUser | null;
  event: IEvent;
}

const EventRegistrationSection: React.FC<Props> = ({ user, event }) => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  if (user?.spectator) {
    return (
      <VStack space="lg" p={"$3"} bg={"$white"}>
        <Heading size={"lg"}>Attend the Event</Heading>
        <HStack space="md" alignItems="center">
          <Icon as={InfoIcon} color={"$primary400"} />
          <Text>
            {isRegistered
              ? "You are registered for this event"
              : "Registrations are open"}
          </Text>
        </HStack>
        <Box w={"$full"} alignItems="center">
          {isRegistered ? (
            <Link href={"/(drawer)/(tabs)/(account)/calendar"}>
              <Button>
                <ButtonText>View in calendar</ButtonText>
              </Button>
            </Link>
          ) : (
            <Link href={"/(drawer)/(tabs)/(account)/calendar"}>
              <Button>
                <ButtonText>Attend the event</ButtonText>
              </Button>
            </Link>
          )}
        </Box>
      </VStack>
    );
  }
};

export default EventRegistrationSection;
