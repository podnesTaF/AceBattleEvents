import React, { useState } from 'react'
import { Box, Center, Heading, Text, VStack } from '@gluestack-ui/themed'
import { Stack, useNavigation } from 'expo-router';
import SearchBar from '@Components/common/SearchBar';
import { teamsPreview, users } from '@Constants/dummy-data';
import UserCard from '@Components/user/UserCard';

const modal = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('')
  return (
    <>
    <Stack.Screen
        options={{
            headerTitle: () => (
                <Box width={'100%'} ml={"-$10"}>
                <SearchBar variant='dark' placeholder='Search by name...' value={query} onChange={(text) => setQuery(text)} />
                </Box>
            )
        }}
  />
    <Box flex={1} bg={'$coolGray100'}>
    {query.length ? (
        <Box p={"$4"}> 
            <Box mb={"$4"}>
                <Heading>
                    Runners
                </Heading>
                <VStack>
                    {users.map((user, i) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </VStack>
            </Box>
        </Box>
    ) 
    : ( 
    <Box flex={1} justifyContent='center' alignItems='center'>
        <Heading size={'xl'} color={"$coolGray800"}>Look for an athlete or team</Heading>
        <Text>Fun Fact</Text>
    </Box>
    )}
    </Box>
    </>
  )
}

export default modal