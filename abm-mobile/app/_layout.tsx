import React from 'react'
import { Tabs } from 'expo-router'
import { StyleSheet, Image} from 'react-native'

const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{
            headerTitle: "Ace Battle Mile",
              headerTitleStyle: { fontSize: 24 },
        }} />
        <Tabs.Screen name="(drawer)" options={{
         
        }} />
        <Tabs.Screen name="modal" />
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