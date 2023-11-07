import { View, Text } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { Avatar, AvatarFallbackText, AvatarImage, HStack, Heading } from '@gluestack-ui/themed'
import { IUser } from '@lib/models'

const HomeTabTitle = ({user}: {user: IUser}) => {
  return (
    <HStack justifyContent='space-between' flex={1} space="md" alignItems='center'>
      {user ? (
       <>
        <HStack alignItems='center' space='md'>
          <Ionicons name="person" size={24} color="white" />
          <Heading size={"md"} color="$white">
            {user.name} {user.surname}
          </Heading>
        </HStack>
        <Avatar rounded={"$md"} size='md' bgColor='$red500'>
          <AvatarImage rounded={"$md"} source={{uri: user.image?.mediaUrl}} alt={"avatar"} />
          <AvatarFallbackText>
            {user.name[0]} {user.surname[0]}
          </AvatarFallbackText>
        </Avatar>
       </>
      ) : (
       <>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Login
        </Text>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Join us
        </Text>
       </>
      )}
    </HStack>
  )
}

export default HomeTabTitle