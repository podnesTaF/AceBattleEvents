import React from 'react'
import { Stack } from 'expo-router'

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={'change-data'} options={{
          headerStyle: {
            backgroundColor: '#1C1E1F',
          },
          headerTintColor: '#fff'
      }} />
      <Stack.Screen name={"change-password"} options={{
         headerStyle: {
          backgroundColor: '#1C1E1F',
        },
        headerTintColor: '#fff'
      }} />
    </Stack>
  )
}

export default SettingsLayout