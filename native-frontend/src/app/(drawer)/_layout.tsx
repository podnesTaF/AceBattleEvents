
import React from 'react'
import Drawer from 'expo-router/drawer'
import CustomDrawerContent from '@Components/CustomDrawerContent'
import LogoTitle from '@Components/LogoTitle'
import { DrawerToggleButton } from "@react-navigation/drawer";


const Layout = () => {
  return (
    <Drawer
      screenOptions={{ headerShown: false}}
      drawerContent={(props: any) => <CustomDrawerContent {...props}/>}
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
          headerShown: true,
          headerLeft: (props) => <DrawerToggleButton {...props} />,
          title: 'Ace Battle Mile',
          headerTitle: (props: any) => <LogoTitle {...props} />,
        }} />
        <Drawer.Screen name="events" options={{
                    title: 'Events',
                    drawerLabel: "Events",
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