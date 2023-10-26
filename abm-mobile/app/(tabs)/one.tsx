import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
       <Link href={"/"} replace asChild>
        <Button  title='logout' />
      </Link>
    </View>
  )
}

export default Page