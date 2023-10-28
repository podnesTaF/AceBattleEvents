import React from 'react'
import { Tabs } from 'expo-router'
import { StyleSheet, Image} from 'react-native'
import {Ionicons} from "@expo/vector-icons"

const Layout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name='home'  options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({size, color}) => (
            <Ionicons name={'home'} size={size} color={color}/> 
          )
        }} />
        <Tabs.Screen name="athletes" options={{
          headerShown: false,
          tabBarLabel: "Athletes",
          tabBarIcon: ({size, color}) => (
            <Ionicons name={'body'} size={size} color={color}/> 
          )
        }} />
         <Tabs.Screen name="notifications" options={{
          headerShown: false,
          tabBarLabel: "Notifications",
          tabBarIcon: ({size, color}) => (
            <Ionicons name={'notifications'} size={size} color={color}/> 
          )
        }} />
        <Tabs.Screen name="account" options={{
          headerShown: false,
          tabBarLabel: "My account",
          tabBarIcon: ({size, color}) => (
            <Ionicons name={'person'} size={size} color={color}/> 
          )
        }} />
    </Tabs> 
  )
}

export default Layout

const styles = StyleSheet.create({
  headerImage: {
    height: 17,
    alignSelf: 'center'
  }
})