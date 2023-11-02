import { View, Text } from 'react-native'
import React from 'react'
import { Box, FlatList, Heading, VStack } from '@gluestack-ui/themed'
import UserCard from '@Components/user/UserCard'
import { users } from '@Constants/dummy-data'

const RunnersTab = ({team}: {team: any}) => {
  return (
    <VStack p={"$3"} space='lg'>
        <VStack>
            <Heading size="sm" mb={"$2"}>
                Coaches
            </Heading>
            <VStack space="sm">
                <UserCard description='Coach of the Kyiv-men' user={team.coach} />
            </VStack>
        </VStack>
        <VStack>
            <Heading size={"sm"} mb={"$2"}>
                Runners
            </Heading>
            <FlatList
                data={users}
                renderItem={({item}) => (
                    <UserCard user={item} />
                )}
                keyExtractor={(item: any) => item.id}   
            />
        </VStack>
    </VStack>
  )
}

export default RunnersTab