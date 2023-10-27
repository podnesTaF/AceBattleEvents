  import { View, Text, Platform, Pressable } from 'react-native'
  import React from 'react'
  import { Link, Slot, Tabs } from 'expo-router'
  import {Ionicons} from "@expo/vector-icons"

  const Layout = () => {

    return (
      <Tabs>
        <Tabs.Screen name="(one)" options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({size, color}) => (
            <Ionicons name={'home'} size={size} color={color}/> 
          )
        }} />
        <Tabs.Screen name="two" options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({size, color}) => (
            <Ionicons name={'person'} size={size} color={color}/> 
          )
        }} />
        <Tabs.Screen name="(three)" options={{
           headerShown: false,
           tabBarLabel: "Drawer ",
          tabBarIcon: ({size, color}) => (
            <Ionicons name={'menu'} size={size} color={color}/> 
          )
        }} />
        </Tabs>
    )
  }

  export default Layout;