import { View, Text, Image} from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'
import {Ionicons} from '@expo/vector-icons'
import CustomDrawerContent from '../../components/CustomDrawerContent'


const Layout = () => {
  return (
    <Drawer
    drawerContent={(props) => <CustomDrawerContent {...props}/>}
      >
        <Drawer.Screen name="(tabs)" options={{
          drawerLabel: 'Home',
          title:"Ace Battle Events"
        }} />
        <Drawer.Screen name="events" options={{
                    headerTitle: "Ace Battle Events",
                    drawerLabel: "Events"
                }} />
         <Drawer.Screen name="rules" options={{
                    headerTitle: "Ace Battle Events",
                    drawerLabel: "ABM Rules"
                }} />
           <Drawer.Screen name="history" options={{
             headerTitle: "Ace Battle Events",
             drawerLabel: "ABM History"
           }} />
            <Drawer.Screen name="news" options={{
             headerTitle: "Ace Battle Events",
             drawerLabel: "News"
           }} />
    </Drawer>
  )
}

export default Layout