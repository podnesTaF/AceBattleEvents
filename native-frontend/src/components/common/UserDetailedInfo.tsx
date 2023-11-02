import { View, Text } from 'react-native'
import React from 'react'
import { Box, HStack, Heading, VStack } from '@gluestack-ui/themed'
import UserCard from '@Components/user/UserCard'

interface UserDetailedInfoProps {
    user: any
    description?: string
}

const UserDetailedInfo:React.FC<UserDetailedInfoProps> = ({user, description}) => {
  return (
    <Box py={"$2"} width={"$full"}>
        <UserCard user={user} isLastElement={true} description={description} />
        <VStack width={'$2/3'} space={"lg"}>
            <HStack justifyContent='space-between' space='md'>
                <Heading size={"md"} color="$coolGray400">Email:</Heading>
                <Heading size={"md"}>{user.email}</Heading>
            </HStack>
            <HStack justifyContent='space-between' space='md'>
                <Heading size={"md"} color="$coolGray400">Phone:</Heading>
                <Heading size={"md"}>+380642922858</Heading>
            </HStack>
        </VStack>
    </Box>
  )
}

export default UserDetailedInfo