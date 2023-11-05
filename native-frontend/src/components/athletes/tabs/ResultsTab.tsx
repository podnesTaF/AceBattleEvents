import { View, Text } from 'react-native'
import React from 'react'
import { Box, Heading, VStack } from '@gluestack-ui/themed'
import CustomTable from '@Components/custom/CustomTable'

const ResultsTab = () => {
  return (
    <VStack mt={"$4"} space='lg'>
        <VStack space='md'>
            <Heading size={"lg"}>Personal Best</Heading>
            <CustomTable />
        </VStack>
    </VStack>
  )
}

export default ResultsTab