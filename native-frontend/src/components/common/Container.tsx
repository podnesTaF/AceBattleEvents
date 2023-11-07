import React from 'react'
import { VStack } from '@gluestack-ui/themed'

const Container = ({children, vertical}: {vertical?: boolean, children: React.ReactNode}) => {
  return (
    <VStack
        px={"$3"}
        width={"$full"}
        borderColor="$red500"
        bgColor="$white"
        borderTopWidth={vertical ? 0 : 3}
        borderBottomWidth={vertical ? 0 : 3}
        borderLeftWidth={vertical ? 3 : 0}
    >
     {children}
    </VStack>
  )
}

export default Container