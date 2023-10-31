import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView  } from 'react-native-safe-area-context';
import UpcomingEventCard from '../../../components/events/UpcomingEventCard';

const Page = () => {
    const router = useRouter()

  return (
    <SafeAreaView>
      <View>
        <UpcomingEventCard />
      </View>
    </SafeAreaView>
   
  )
}

export default Page