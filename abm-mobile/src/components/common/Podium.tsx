import { View, Text } from 'react-native'
import React from 'react'
import { Box, HStack } from '@gluestack-ui/themed'

const Podium = ({items, space}: {items: any[], space: any}) => {
  return (
    <HStack space={space || 'md'}>
      {[2, 1, 3].map((place) => (
        <Box
        key={place}>
            
      </Box>
      ))};
    </HStack>
  )
}

export default Podium