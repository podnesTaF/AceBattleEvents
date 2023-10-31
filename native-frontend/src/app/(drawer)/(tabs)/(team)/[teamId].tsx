import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const TeamScreen = () => {
    const params = useLocalSearchParams()
  return (
    <View>
      <Text>Team: {params.teamId}</Text>
    </View>
  )
}

export default TeamScreen