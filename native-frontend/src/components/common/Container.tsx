import React from 'react'
import { VStack } from '@gluestack-ui/themed'

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <VStack
        px={"$3"}
        width={"$full"}
        borderColor="$red500"
        bgColor="$white"
        borderTopWidth={3}
        borderBottomWidth={3}
    >
     {children}
    </VStack>
  )
}

export default Container