  import { View, Text } from 'react-native'
  import React from 'react'
  import { Tabs } from 'expo-router'
  import {Ionicons} from "@expo/vector-icons"

  const Layout = () => {
    return (
      <Tabs>
        <Tabs.Screen name="one" options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Ionicons name="md-checkmark-circle" size={24} color="black" />
          )
        }} />
        <Tabs.Screen name="two" options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <Ionicons name="body" />
          )
        }} />
        </Tabs>
    )
  }

  export default Layout;