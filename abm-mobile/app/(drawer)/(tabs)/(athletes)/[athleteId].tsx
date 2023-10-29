import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'



const AthleteScreen = () => {
    const params = useLocalSearchParams()
  return (
    <View>
      <Text>Athlete: {params.athleteId}</Text>
    </View>
  )
}

export default AthleteScreen