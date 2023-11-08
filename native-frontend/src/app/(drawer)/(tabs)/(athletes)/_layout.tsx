import React, { useState } from 'react'
import { Stack, useNavigation } from 'expo-router'
import { Box, Center, Text } from '@gluestack-ui/themed'
import SearchBar from '@Components/common/SearchBar'
import AthletesPageTitle from '@Components/athletes/AthletesPageTitle'
import { Ionicons } from '@expo/vector-icons'
import { HeaderBackButton } from '@react-navigation/elements'

const Layout = () => {

  return (
    <Stack>
        <Stack.Screen name='index' options={{
          headerStyle: {
            backgroundColor: '#1C1E1F',
          },
          headerTintColor: '#fff',
          title: 'Ace Battle Mile',
          headerTitle: (props) => (
            <AthletesPageTitle />
          ),
        }} />
        <Stack.Screen name='[userId]' options={{
          headerTitle: "Athelte page"
        }} />
    </Stack>
  )
}

export default Layout