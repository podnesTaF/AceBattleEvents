
import React from 'react'
import { Center } from '@gluestack-ui/themed'
import SearchBar from '@Components/common/SearchBar'

const AthletesPageTitle = () => {
  return (
    <Center width={"95%"} >
        <SearchBar placeholder='Search for an athlete...' value={''} onChange={(text) => {}} />
    </Center>
  )
}

export default AthletesPageTitle