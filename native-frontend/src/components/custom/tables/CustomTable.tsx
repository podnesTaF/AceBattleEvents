import React from 'react'
import { View, Text, VStack, HStack, Heading, Box, Button, ButtonText} from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'
import TableRowItem from './TableRowItem'


interface Props {
        rows: {
                [key: string]: string | {
                        type: string,
                        color: string,
                        text: string,
                        link: any;
                }
        }[] 
}


const CustomTable: React.FC<Props> = ({rows}) => {
        const router = useRouter()
  return (
    <VStack>
        <HStack space='md' bg={"$black"} px={"$4"} py={"$2"}>
            {Object.keys(rows[0]).map((key, i, arr) => (
                <Heading color={"$white"}  key={i} textAlign={i === arr.length - 1 ? 'right': "left"} flex={i === arr.length - 1 ? 2 : 1} size={'md'}>
                    {key}
                </Heading>
            ))}
        </HStack>
           {rows.map((row, i) => (
                <HStack key={i} alignItems='center' space='md' bg={"$white"} px={"$4"} py={"$2"}>
                {Object.values(row).map((value, j, arr) => (
                        <TableRowItem key={j} item={value} isLast={arr.length - 1 === j}  />
                 ))}
                </HStack>
           ))}
    </VStack>
  )
}

export default CustomTable
