import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TeamLayout = () => {
  return (
    <Stack>
        <Stack.Screen name={'[teamId]'} options={{
          headerStyle: {
            backgroundColor: '#1C1E1F'
          },
          headerTintColor: '#fff',
            title: "Team Page"
        }} />
    </Stack>
  )
}

export default TeamLayout