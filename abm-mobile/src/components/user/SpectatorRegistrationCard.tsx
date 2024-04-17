import AbmButton from "@Components/common/buttons/AbmButton";
import EventCard from "@Components/events/EventCard";
import { Box } from "@gluestack-ui/themed";
import { IViewer } from "@lib/models";

interface Props {
  registration: IViewer;
}

const SpectatorRegistrationCard: React.FC<Props> = ({ registration }) => {
  return (
    <EventCard event={registration.event}>
      <Box alignItems="center">
        <AbmButton title={"Download ticket"} onPress={() => {}} />
      </Box>
    </EventCard>
  );
};

export default SpectatorRegistrationCard;
