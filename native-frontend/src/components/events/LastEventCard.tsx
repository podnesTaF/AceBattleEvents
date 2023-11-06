import React from 'react'
import { Box, HStack, Heading, Image} from '@gluestack-ui/themed';
import { formatDate } from '@lib/utils';
import { Link } from 'expo-router';

interface Props {
    event: any;
    height?: any
}

const LastEventCard: React.FC<Props> = ({event, height}) => {
  return (
    <Box position='relative' height={height || 'auto'}>
        <Image role={'img'} size={"full"} alt={'event image'} source={{uri: event.introImage?.mediaUrl}} />
        <Box position='absolute' py={'$3'} px={"$4"} bottom={0} left={0} w={"$full"} bgColor={"rgba(0,0,0,0.5)"}>
            <Heading size="xl" color="$white">{event.title}</Heading>
            <HStack justifyContent='space-between'>
                <Heading size={"sm"} color="$coolGray300">{formatDate(event.startDateTime, false)}</Heading>
                <Link href={"/(drawer)/events"} asChild >
                <Heading size={"sm"} color="$coolGray300">view details</Heading>
                </Link>
            </HStack>
        </Box>
    </Box>
  )
}

export default LastEventCard