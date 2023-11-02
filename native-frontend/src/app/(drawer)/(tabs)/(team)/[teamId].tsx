import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Box, HStack, Heading, Image, ScrollView } from '@gluestack-ui/themed'
import { teams } from '@Constants/dummy-data'
import Tabs from '@Components/common/Tabs'
import HomeTeamTab from '@Components/teams/tabs/HomeTeamTab'
import RunnersTab from '@Components/teams/tabs/RunnersTab'

const tabs = [
  "Home",
  "Runners",
  "Results",
  "Contact"
]

const TeamScreen = () => {
  const params = useLocalSearchParams()
  const [team, setTeam] = useState(teams[0])
  const [activeTab, setActiveTab] = useState(0)


  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  return (
   <>
    <Stack.Screen options={{
      headerTitle: ({tintColor}) => (
        <Box w={'$full'}>
          <HStack py={"$2"} space='sm'  w={"$full"}  alignItems='center'>
            <Image role={'img'} alt={"team logo"} source={{uri: team.logo.mediaUrl}} size={'sm'} />
            <Heading size='xl' color={tintColor}>{team.name}</Heading>
          </HStack>
          <Tabs items={tabs} onChangeTab={onChangeTab} activeIndex={activeTab} />
        </Box>
      )
    }} />
      {activeTab === 0 && (
        <ScrollView>
         <HomeTeamTab team={team} />
        </ScrollView>
      )}
      {activeTab === 1 && (
        <RunnersTab team={team} />
      )}
   </>
  )
}

export default TeamScreen