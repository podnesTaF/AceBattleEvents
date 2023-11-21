import { Button, ButtonText, HStack, Heading } from "@gluestack-ui/themed";
import { IRace } from "@lib/models";
import { getBattleName, msToMinutesAndSeconds } from "@lib/utils";
import React from "react";

interface TeamRaceItemProps {
  race: IRace;
  isLast?: boolean;
  teamId: number;
}

const TeamRaceItem: React.FC<TeamRaceItemProps> = ({
  race,
  isLast,
  teamId,
}) => {
  const result = () => {
    return race?.teamResults?.find((tr) => tr.team?.id === teamId)
      ? msToMinutesAndSeconds(
          race.teamResults.find((tr) => tr.team?.id === teamId)!.resultInMs
        )
      : "-";
  };
  return (
    <HStack
      flex={1}
      alignItems="center"
      justifyContent="space-between"
      py={"$2"}
      borderColor={"$coolGray300"}
      borderBottomWidth={isLast ? "$0" : "$1"}
    >
      <Heading size="sm" flex={1}>
        {getBattleName(race)}
      </Heading>
      <HStack flex={1} justifyContent="flex-end" space="md" alignItems="center">
        <Heading size={"md"}>{result()}</Heading>
        <Button size={"sm"} action="positive" variant="solid">
          <ButtonText>details</ButtonText>
        </Button>
      </HStack>
    </HStack>
  );
};

export default TeamRaceItem;
