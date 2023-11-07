import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SettingLayout = () => {
  return (
    <Stack>
        <Stack.Screen name={'(main)'} options={{
            headerTitle: "Settings",
        }} />
    </Stack>
  )
}

export default SettingLayout