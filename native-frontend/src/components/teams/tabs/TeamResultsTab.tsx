import { View, Text } from 'react-native'
import React from 'react'
import { Box, Heading, VStack } from '@gluestack-ui/themed'
import PersonalBestCard from '../PersonalBestCard'
import { FlatList } from 'react-native-gesture-handler'
import { races } from '@Constants/dummy-data'
import TeamRaceItem from '../TeamRaceItem'
import Container from '@Components/common/Container'

const TeamResultsTab = ({team}: {team: any}) => {
  return (
    <VStack space={'xl'}>
        <VStack p={"$3"} space='md'>
            <Heading size={'md'}>Team Best</Heading>
            <PersonalBestCard result={team.personalBest} />
        </VStack>
        <VStack space={"md"}>
            <Heading mx={'$3'} size={'md'}>All Results</Heading>
        </VStack>
        <Container>
            <FlatList
                data={races}
                renderItem={({ item, index }) => <TeamRaceItem race={item} isLast={races.length - 1 === index} />}
                keyExtractor={(item: any) => item.id}
            />
        </Container>
    </VStack>
  )
}

export default TeamResultsTab