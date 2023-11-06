import { msToMinutesAndSeconds, getBattleName } from '@lib/utils';
import { Button, ButtonText, HStack, Heading } from '@gluestack-ui/themed'
import React from 'react'

interface TeamRaceItemProps {
    race: any;
    isLast?: boolean;
}

const TeamRaceItem: React.FC<TeamRaceItemProps> = ({race, isLast}) => {
  return (
    <HStack flex={1} alignItems='center' justifyContent='space-between'  py={"$2"} borderColor={"$coolGray300"} borderBottomWidth={isLast ? "$0" : "$1"}>
        <Heading size="sm" flex={1}>
            {getBattleName(race)}
        </Heading>
        <HStack flex={1} justifyContent='flex-end' space='md' alignItems='center'>
            <Heading size={"md"}>
                {msToMinutesAndSeconds(race.teamResults[0].resultInMs)}
            </Heading>
            <Button size={"sm"} action='positive' variant='solid' >
                <ButtonText>details</ButtonText>
            </Button>
        </HStack>
    </HStack>
  )
}

export default TeamRaceItem