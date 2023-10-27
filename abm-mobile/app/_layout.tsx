import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { StyleSheet, Image} from 'react-native'

const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{
            headerTitle: "Test Page",
            headerBackground: () => ( <Image style={styles.headerImage} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }} />)
        }} />
        <Tabs.Screen name="(tabs)" options={{
            headerShown: false
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