import { View, Text } from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'

const Layout = () => {
  return (
   <Drawer>
    <Drawer.Screen
                name="events"
                options={{
                    headerTitle: "Ace Battle Events",
                    drawerLabel: "Events"
                }}
            />
<Drawer.Screen
                name="abm-concept"
                options={{
                    headerTitle: "Ace Battle Mile Concept",
                    drawerLabel: "ABM Concept"
                }}
            />
            <Drawer.Screen
                name="history"
                options={{
                    headerTitle: "Ace Battle Mile History",
                    drawerLabel: "History of ABM"
                }}
            />
            <Drawer.Screen
                name="news"
                options={{
                    headerTitle: "News",
                    drawerLabel: "News"
                }}
            />
   </Drawer>
  )
}

export default Layout