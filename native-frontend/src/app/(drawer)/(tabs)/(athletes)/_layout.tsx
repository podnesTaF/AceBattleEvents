import React from 'react'
import { Stack } from 'expo-router'
import { Center } from '@gluestack-ui/themed'
import SearchBar from '@Components/common/SearchBar'
import AthletesPageTitle from '@Components/athletes/AthletesPageTitle'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{
          headerStyle: {
            backgroundColor: '#1C1E1F'
          },
          headerTintColor: '#fff',
          title: 'Ace Battle Mile',
          headerTitle: (props) => (
            <AthletesPageTitle />
          ),
        }} />
        <Stack.Screen name='[athleteId]' options={{
            headerTitle: "Athlete page"
        }} />
    </Stack>
  )
}

export default Layout