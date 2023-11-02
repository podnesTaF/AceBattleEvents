import { HStack, Pressable, Text } from '@gluestack-ui/themed'
import React from 'react'

interface TabItemProps {
    item: string;
    index: number;
    onPress: (tabIndex: number) => void;
    isLast?: boolean;
    activeIndex: number;
    activeColor?: string;
}

const TabItem: React.FC<TabItemProps> = ({item, index, onPress, isLast, activeIndex, activeColor}) => {
  return (
    <Pressable flex={1} onPress={() => onPress(index)}>
    {({pressed}: {pressed: boolean}) => (
        <HStack flex={1} justifyContent='center' py={"$1.5"} px={"$3"} opacity={pressed ? "$90" : "$100"} borderBottomColor={activeColor || "#ff0000"} borderBottomWidth={activeIndex === index ? "$2" : '$0'} key={index}>
            <Text size={"lg"} fontWeight='600' color={index === activeIndex ? "$white" : "$coolGray400"}>{item}</Text>
        </HStack>
    )}
</Pressable>
  )
}

export default TabItem