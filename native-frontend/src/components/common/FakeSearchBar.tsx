import React from 'react'
import { Box, HStack, Text } from '@gluestack-ui/themed'
import { Ionicons } from "@expo/vector-icons";

const FakeSearchBar = ({placeholder, bg}: {placeholder: string, bg?: any}) => {
  return (
    <HStack alignItems='center' width={"$full"} bg={bg || "$white"} rounded={'$lg'} softShadow='2' px={'$3'} py={"$1.5"}>
        <Box mr={"$2"}>
        <Ionicons name={'search'} size={24} color={'gray'} />
        </Box>
        <Text size={"lg"} color="$coolGray400">{placeholder}</Text>
        <Box ml={'auto'}>
            <Ionicons name={'arrow-forward'} size={24} color={'gray'} />
        </Box>
    </HStack>
  )
}

export default FakeSearchBar
