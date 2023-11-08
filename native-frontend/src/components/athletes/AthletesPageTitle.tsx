
import React from 'react'
import { Center, Pressable } from '@gluestack-ui/themed'
import SearchBar from '@Components/common/SearchBar'
import { useRouter } from 'expo-router'
import FakeSearchBar from '@Components/common/FakeSearchBar'

const AthletesPageTitle = () => {
  const router = useRouter()
  return (
    <Pressable  width={'95%'}  onPress={() => router.push("/(modals)/(find)/find-athlete")}>
      {({pressed}: {pressed: boolean}) => (
        <Center opacity={pressed ? "$90" : "$100"} >
          <FakeSearchBar  placeholder='Search for an athlete...' />
        </Center>
      )}
    </Pressable>
  )
}

export default AthletesPageTitle