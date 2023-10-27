import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
       <Link href={"/"} replace asChild>
        <Button  title='logout' />
      </Link>
      <Link href={"/(tabs)/(one)/details"} asChild>
        <Button  title='Open Details' />
      </Link>
      <Link href={"/(tabs)/(one)/43"} asChild>
        <Button  title='Open Details oyjr' />
      </Link>
      <Link href={"/(tabs)/(one)/41"} asChild>
        <Button  title='Open Details 41' />
      </Link> 
      <Link href={"/modal"} asChild>
        <Button  title='Open modal' />
      </Link> 
      <Link href={"/(aux)/disclaimer"} asChild>
        <Button  title='Open disclaimer' />
      </Link> 
    </View>
  )
}

export default Page