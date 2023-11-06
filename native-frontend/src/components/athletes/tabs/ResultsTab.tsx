import { View, Text } from 'react-native'
import React from 'react'
import { Box, HStack, Heading, VStack } from '@gluestack-ui/themed'
import CustomTable from '@Components/custom/tables/CustomTable'
import Badge from '@Components/custom/Badge'

const personalBests = [
  {
    "Distance": "729 m",
    "Time": "1:39.23",
    "Details": {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home"
    },
  },
  {
    "Distance": "1609 m",
    "Time": "4:09.23",
    "Details": {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home"
    },
  },
]

const allResults = [
  {
    "Distance": "729 m",
    "Time": "1:39.23",
    "Details": {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home"
    },
  },
  {
    "Distance": "1609 m",
    "Time": "4:09.23",
    "Details": {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home"
    },
  },
]

const ResultsTab = () => {
  return (
    <VStack mt={"$4"} space='lg'>
        <VStack space='md'>
            <Heading mx={"$4"} size={"lg"}>Personal Best</Heading>
            <CustomTable rows={personalBests} />
        </VStack>
        <VStack space='sm' mx={"$0"}>
            <Heading mx={"$4"} size={"lg"}>All Results</Heading>
            <HStack mx={"$2"} space="md">
              {['2023', "2022"].map((year, i) => (
                <Badge px={"$3"} py={"$1"} key={i} text={year} isActive={i === 0} onPress={() => {}} />
              ))}
            </HStack>
            <CustomTable rows={allResults} />
        </VStack>
    </VStack>
  )
}

export default ResultsTab