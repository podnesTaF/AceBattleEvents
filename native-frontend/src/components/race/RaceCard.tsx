import CustomModal from "@Components/custom/CustomModal";
import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { IRace, RaceShortForm } from "@lib/models";
import { formatDate, getBattleName } from "@lib/utils";
import { Link } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React, { useState } from "react";

interface Props {
  race: IRace | RaceShortForm;
  isLast?: boolean;
  registrationAvailable?: boolean;
}

const RaceCard = ({
  race,
  registrationAvailable,
  isLast,
}: Props): JSX.Element => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <VStack space={"md"}>
        <HStack
          py={"$2"}
          space={"md"}
          alignItems="center"
          borderColor="$coolGray400"
          borderBottomWidth={isLast ? 0 : 1}
        >
          <Heading size={"sm"} color="$coolGray400">
            {formatDate(race.startTime, false, true)}
          </Heading>
          <Heading flex={1} size={"sm"}>
            {race.name ? race.name : getBattleName(race as IRace)}
          </Heading>
          <Link href={`/(modals)/(race)/${race.id}`} asChild>
            <Button size={"sm"}>
              <ButtonText>View Race</ButtonText>
            </Button>
          </Link>
        </HStack>
        <HStack space={"md"}>
          <Button variant={"outline"} action="positive" flex={1}>
            <ButtonText>Register your team for the race</ButtonText>
          </Button>
          <Button
            onPress={() => setInfoOpen(true)}
            borderRadius="$full"
            size="lg"
            p="$1.5"
            bg={"$primary500"}
          >
            <ButtonIcon as={InfoIcon} color={"$white"} />
          </Button>
        </HStack>
      </VStack>
      <CustomModal
        title={"Race registrations"}
        isOpen={infoOpen}
        onClose={(title) => setInfoOpen(false)}
        text={
          "You have to submit the final structre of the team. Pick 7 runners"
        }
      />
    </>
  );
};

export default RaceCard;
