import React from 'react'
import { View, Text, VStack, HStack, Heading, Box} from '@gluestack-ui/themed'



const CustomTable = () => {
  return (
    <VStack>
        <HStack space='md' bg={"$black"} px={"$4"} py={"$2"}>
            <Heading flex={1} size={'lg'} color={"$white"}>
                    Result
            </Heading>
            <Heading flex={1} size={'lg'} color={"$white"}>
                    Result
            </Heading>
            <Heading flex={3} textAlign='right' size={'lg'} color={"$white"}>
                    Result
            </Heading>
        </HStack>
        <HStack space='md' bg={"$white"} px={"$4"} py={"$2"}>
            <Heading flex={1} size={'lg'}>
                    1:12.22
            </Heading>
            <Heading flex={1} size={'lg'}>
            1:12.22
            </Heading>
            <Heading textAlign='right' flex={3} size={'lg'}>
            1:12.22
            </Heading>
        </HStack>
    </VStack>
  )
}

export default CustomTable
