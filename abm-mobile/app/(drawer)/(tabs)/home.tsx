import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'

const Page = () => {
    const router = useRouter()

  return (
    <View>
      <Button onPress={() => router.push("/register")} title='Register' />
      <Link href={"/register"} asChild>
      <Button  title='Register with link' />
      </Link>
    </View>
  )
}

export default Page