import { View, Text } from 'react-native'
import React from 'react'
import { IUser } from '@lib/models'
import { Heading, VStack } from '@gluestack-ui/themed'

const UserContactInfo = ({user}: {user: IUser}) => {
  return (
    <VStack space="md" flex={1}>
            <Heading mx={"$3"}>
                Contact info
            </Heading>
            <VStack w={"$full"} space={"lg"} p="$4" borderLeftWidth={'$4'} bgColor={"$white"} borderColor='$red500'>
                <Heading>email: {user.email}</Heading>
                <Heading>phone: +32032219621</Heading>
            </VStack>
        </VStack>
  )
}

export default UserContactInfo