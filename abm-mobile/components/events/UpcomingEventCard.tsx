import { View, Text, StyleSheet, ImageBackground } from 'react-native'

import React from 'react'

const UpcomingEventCard = () => {
  return (
    <View>
      <Text style={styles.title}>Upcoming Events</Text>
      <View style={styles.container}>
      <View style={styles.mainCard}>
      <ImageBackground source={{uri: 'https://storage.googleapis.com/abe_cloud_storage/image/large/585a2df4-3c02-4514-8b0e-515a4c95875f.jpeg'}} resizeMode="cover"
        style={{width: "100%", height: "100%"}}
      >
        <View style={styles.cardTitleBox}>
            <Text style={styles.cardTitle}>Brussels Mile</Text>
        </View>
    
      </ImageBackground >
      </View>
      <View style={styles.shadowCard}>
            <Text style={styles.title}>March 2024</Text>
        </View>
     
      </View>
    </View>
  )
}

export default UpcomingEventCard

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 16,
        textTransform: "uppercase"
    },
    container: {
        width: "100%",
        paddingHorizontal: 16,
        position: 'relative',
    },
    mainCard: {
        borderRadius: 10,
        width: "100%",
        height: 300
    },
    cardTitleBox: {
        backgroundColor: "#000000",
        padding: 12,
        borderBottomStartRadius: 10,
        borderBottomRightRadius: 10
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: 'white'
    },
    shadowCard: {
        position: 'absolute',
        bottom: 0,
        right: -5,
        borderRadius: 10,
        zIndex: -10,
        backgroundColor: "#f9f9f9",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "100%",
        height: "100%"
    }
})