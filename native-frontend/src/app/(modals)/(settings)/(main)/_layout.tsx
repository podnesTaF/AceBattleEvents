import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={'index'} options={{
        headerShown: false
      }} />
      <Stack.Screen name={'change-data'} options={{
          headerTitle: "Change data",
      }} />
      <Stack.Screen name={"change-password"} options={{
          headerTitle: "Change password"
      }} />
    </Stack>
  )
}

export default SettingsLayout