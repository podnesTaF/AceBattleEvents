import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'

const Page = () => {
    const router = useRouter()

  return (
    <View>
     <Text>Home page</Text>
     <View>
      
      <Link href={'/(drawer)/(tabs)/(athletes)/52'}>
      <Pressable>
       <Text style={{fontSize: 24, color: 'blue'}}> Visit athlete page</Text>
        </Pressable>
      </Link>
      <Button onPress={() => router.push('/(drawer)/(tabs)/(team)/12')} title={'team page link'} />  
     </View>
    </View>
  )
}

export default Page