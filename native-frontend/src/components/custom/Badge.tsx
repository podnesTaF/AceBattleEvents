import { Pressable } from 'react-native'
import React from 'react'
import { Box, Heading } from '@gluestack-ui/themed'

const Badge = ({text, isActive, onPress, ...props}: any) => {
  return (
    <Pressable onPress={() => onPress(text)}>
        {({ pressed }) => (
            <Box {...props} bgColor={isActive ? "$red500" : "$coolGray400"} rounded={"$xl"} softShadow={pressed ? "1" : undefined}>
                <Heading color={"$white"} size={"sm"}>
                    {text}
                </Heading>
            </Box>
        )}
    </Pressable>
  )
}

export default Badge