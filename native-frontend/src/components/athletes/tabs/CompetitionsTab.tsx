import { View, Text } from 'react-native'
import React from 'react'
import { Box, Heading } from '@gluestack-ui/themed'
import EventCard from '@Components/events/EventCard'
import { events, teams } from '@Constants/dummy-data'

const CompetitionsTab = () => {
  return (
    <Box my={"$4"} mx={"$3"}>   
        <Heading size={"lg"} mb={"$4"}>Upcoming competitions</Heading>
        <EventCard event={(events[0] as any)} team={(teams[0] as any)} />
    </Box>
  )
}

export default CompetitionsTab