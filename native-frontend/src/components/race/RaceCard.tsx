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
import { useAppDispatch } from "@lib/hooks";
import { IRace, RaceWithCheckIn } from "@lib/models";
import { setItems } from "@lib/store";
import {
  formatDate,
  getBattleName,
  mapRaceRegistrationsToPickItems,
} from "@lib/utils";
import { Link, useRouter } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React, { useState } from "react";

interface Props {
  race: Partial<RaceWithCheckIn>;
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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onRegister = async () => {
    if (registrationAvailable) {
      dispatch(
        setItems({
          key: "availableTeams",
          items: mapRaceRegistrationsToPickItems(
            race.raceRegistrationsToCheckIn
          ),
        })
      );
      router.push({
        pathname: "/(modals)/(event)/race-register",
      });
    }
  };

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
            <Button
              onPress={onRegister}
              variant={"outline"}
              action="positive"
              flex={1}
            >
              <ButtonText>Register your team for the race</ButtonText>
            </Button>
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
