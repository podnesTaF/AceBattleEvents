import EventCard from "@Components/events/EventCard";
import { Button, ButtonText, HStack, Text } from "@gluestack-ui/themed";
import { IViewer } from "@lib/models";

interface Props {
  registration: IViewer;
}

const SpectatorRegistrationCard: React.FC<Props> = ({ registration }) => {
  return (
    <EventCard event={registration.event}>
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
