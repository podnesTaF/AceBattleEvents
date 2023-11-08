import React, { useState } from 'react'
import { Box, Center, Heading, Text, VStack } from '@gluestack-ui/themed'
import { Stack, useNavigation } from 'expo-router';
import SearchBar from '@Components/common/SearchBar';
import { teamsPreview, users } from '@Constants/dummy-data';
import UserCard from '@Components/user/UserCard';

const FindAthelteModal = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('')
  return (
    <>
    <Stack.Screen
        options={{
            headerStyle: {
                backgroundColor: "#1C1E1F",
            },
            headerTintColor: "#fff",
            headerShown: true,
            headerTitle: () => (
                    <VStack mt={"$4"} mb={"$2"} width={'100%'} ml={"-$10"} alignItems='center'>
                        <Heading size="sm" color="$coolGray200">
                            Find Athlete
                        </Heading>
                        <SearchBar variant='dark' placeholder='Search by name...' value={query} onChange={(text) => setQuery(text)} />
                    </VStack>
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

export default FindAthelteModal