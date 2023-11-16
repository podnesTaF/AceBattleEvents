import CustomModal from "@Components/custom/CustomModal";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  HStack,
  Heading,
  Pressable,
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
  eventId?: number;
}

const RaceCard = ({
  race,
  registrationAvailable,
  isLast,
  eventId,
}: Props): JSX.Element => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <VStack
        space={"md"}
        py={"$2"}
        borderColor="$coolGray400"
        borderBottomWidth={isLast ? 0 : 1}
      >
        <HStack space={"md"} alignItems="center">
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
        {registrationAvailable && (
          <HStack alignItems="center" space={"md"}>
            <Link
              href={{
                pathname: "/(modals)/(event)/race-register",
                params: {
                  eventId: eventId + "",
                  raceId: race.id + "",
                },
              }}
              asChild
            >
              <Button variant={"outline"} action="positive" flex={1}>
                <ButtonText>Register your team for the race</ButtonText>
              </Button>
            </Link>
            <Center p={"$2"}>
              <Pressable onPress={() => setInfoOpen(true)}>
                {({ pressed }: { pressed: boolean }) => (
                  <ButtonIcon
                    opacity={pressed ? 0.8 : 1}
                    as={InfoIcon}
                    color={"$black"}
                    size={"xl"}
                  />
                )}
              </Pressable>
            </Center>
          </HStack>
        )}
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
