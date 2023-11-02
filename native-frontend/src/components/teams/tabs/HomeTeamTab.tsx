import { Box, Heading } from '@gluestack-ui/themed'
import React from 'react'
import TeamPreviewCard from '../TeamPreviewCard'
import TeamDescription from '../TeamDescription'
import LastEventCard from '@Components/events/LastEventCard'
import { events } from '@Constants/dummy-data'


const HomeTeamTab = ({team}: {team: any}) => {
  return (
    <Box p={"$2"} flex={1}>
        <TeamPreviewCard
            team={team}
            Item={TeamDescription}
        />
        <Box my={"$4"}>
            <Heading size={'lg'} mb={"$2"}>Last Event</Heading>
            <LastEventCard event={events[0]} height={"$40"} />
        </Box>
    </Box>  
  )
}

export default HomeTeamTab