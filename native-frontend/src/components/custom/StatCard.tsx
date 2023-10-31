import React from 'react'
import { Box, Center, Heading, Text } from '@gluestack-ui/themed';

interface StatCardProps {
    bg: string,
    borderColor?: string;
    radius: number;
    title: string;
    subtitle?: string
    dark?: boolean;
}   

const StatCard: React.FC<StatCardProps> = ({bg, borderColor, radius, title, subtitle, dark}) => {
  return (
    <Center width={"$full"} px={"$4"} py={"$1"} minHeight={"$24"} bg={bg} rounded={radius} borderColor={borderColor} borderWidth={borderColor ? 1 : 0}>
      <Heading size={'lg'} color={dark ? "$white" : "$red500"}>{title}</Heading>
        {subtitle && <Text textAlign='center' size={"md"} color={dark ? "$white" : "$black"}>{subtitle}</Text>}
    </Center>
  )
}

export default StatCard