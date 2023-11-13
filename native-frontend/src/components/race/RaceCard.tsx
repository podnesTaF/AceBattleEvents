import { Button, ButtonText, HStack, Heading } from "@gluestack-ui/themed";
import { IRace } from "@lib/models";
import { formatDate, getBattleName } from "@lib/utils";
import { Link } from "expo-router";
import React from "react";

interface Props {
  race: IRace;
  isLast?: boolean;
  registrationAvailable?: boolean;
}

const RaceCard = ({
  race,
  registrationAvailable,
  isLast,
}: Props): JSX.Element => {
  return (
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
        {getBattleName(race)}
      </Heading>
      <Link href={`/(modals)/(race)/${race.id}`} asChild>
        <Button size={"sm"}>
          <ButtonText>View Race</ButtonText>
        </Button>
      </Link>
    </HStack>
  );
};

export default RaceCard;
