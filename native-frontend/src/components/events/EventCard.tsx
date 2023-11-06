import React from 'react'
import { IEvent, ITeam } from '@lib/models'
import { Box, HStack, Heading, VStack, Text, Image } from '@gluestack-ui/themed'
import { convertFlagIntoPng, formatDate } from '@lib/utils'

interface Props {
    event: IEvent
    team: ITeam
}

const EventCard: React.FC<Props> = ({event,  team}) => {
  return (
    <Box>
        <Heading size={"lg"} mb={"$4"}>
            {event.title}
        </Heading>
        <VStack space="md" width={'$full'}>
            <HStack justifyContent='space-between' space="md">
                <Text size={"md"}>Date</Text>
                <Heading size={"md"}>{formatDate(event.startDateTime, false)}</Heading>
            </HStack>
            <HStack justifyContent='space-between' space="md">
                <Text size={"md"}>Location</Text>
                <HStack alignItems='center' space='sm'>
                        {event.location.country?.flagIconUrl && (
                            <Image role={"img"} alt={"flag"} source={{uri: convertFlagIntoPng(event.location.country.flagIconUrl)}} size={"xs"} maxHeight={"$7"} />
                        )}
                        <Heading size={"md"}>
                            {event.location.country.name}
                        </Heading>
                    </HStack>
            </HStack>
            <HStack justifyContent='space-between' space="md">
                <Text size={"md"}>Team</Text>
                <Heading size={"md"}>{team.name}</Heading>
            </HStack>
            <HStack justifyContent='space-between' space="md">
                <Text size={"md"}>Details</Text>
                <Heading size={"md"}>visit event page</Heading>
            </HStack>
        </VStack>
    </Box>
  )
}

export default EventCard