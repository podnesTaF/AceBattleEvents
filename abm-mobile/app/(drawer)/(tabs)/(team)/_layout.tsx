import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TeamLayout = () => {
  return (
    <Stack>
        <Stack.Screen name={'[teamId]'} options={{
            headerTitle: "Team Page"
        }} />
    </Stack>
  )
}

export default TeamLayout