import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Box, HStack, Heading, Image } from '@gluestack-ui/themed'

interface Props {
    title: string;
    icon?: string;
    width?: any;
}

const TitleRect: React.FC<Props> = ({title, icon, width}) => {
  return (
    <Box position="absolute" top={0} left={0} w={width || "$48"} height={"$8"} justifyContent="center" alignItems="center">
        <Image role={"img"} alt={"vector"} source={require("@Assets/images/title-rect.png")} size="full" position="absolute" zIndex={1} />
        <HStack space={"sm"}>
        <Heading zIndex={2} size={"md"} color={"$white"}>
            {title}
        </Heading>
        <Ionicons name={icon as any} color="white" size={16} />
        </HStack>
    </Box>
  )
}

export default TitleRect