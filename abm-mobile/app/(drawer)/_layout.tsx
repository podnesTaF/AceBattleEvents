import { View, Text, Image} from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'
import {Ionicons} from '@expo/vector-icons'
import CustomDrawerContent from '../../components/CustomDrawerContent'
import LogoTitle from '../../components/LogoTitle'


const Layout = () => {
  return (
    <Drawer
    drawerContent={(props) => <CustomDrawerContent {...props}/>}
      >
        <Drawer.Screen name="(tabs)" options={{
          drawerLabel: 'Home',
          headerStyle: {
            backgroundColor: '#1C1E1F',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Ace Battle Mile',
          headerTitle: props => <LogoTitle {...props} />,
        }} />
        <Drawer.Screen name="events" options={{
                    title: 'Events',
                    drawerLabel: "Events"
                }} />
         <Drawer.Screen name="rules" options={{
                      headerShown: false,
                    drawerLabel: "ABM Rules"
                }} />
           <Drawer.Screen name="history" options={{
             headerShown: false,
             drawerLabel: "ABM History"
           }} />
            <Drawer.Screen name="news" options={{
               headerShown: false,
             drawerLabel: "News"
           }} />
    </Drawer>
  )
}

export default Layout