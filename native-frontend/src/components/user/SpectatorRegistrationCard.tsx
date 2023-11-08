import EventCard from "@Components/events/EventCard";
import { Button, ButtonText, HStack, Text } from "@gluestack-ui/themed";
import { IEvent, IUser } from "@lib/models";

interface Props {
  event: IEvent;
  user: IUser;
}

const SpectatorRegistrationCard: React.FC<Props> = ({ event, user }) => {
  return (
    <EventCard event={event}>
      <HStack justifyContent="space-between" space="md">
        <Text size={"md"}>Ticket</Text>
        <Button>
          <ButtonText>View ticket</ButtonText>
        </Button>
      </HStack>
    </EventCard>
  );
};

export default SpectatorRegistrationCard;
