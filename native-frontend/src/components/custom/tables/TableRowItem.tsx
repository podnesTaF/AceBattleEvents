import { View, Text } from 'react-native'
import React from 'react'
import { Box, Button, ButtonText, Heading } from '@gluestack-ui/themed'
import { Link, useRouter } from 'expo-router'

interface Props {
  item: string | {
    type: string,
    color: string,
    text: string,
    link: any;
  },
  isLast?: boolean;
}

const TableRowItem: React.FC<Props> = ({item, isLast}) => {
  const router = useRouter();


  if(typeof item !== 'string') {
    if(item.type === 'button') {
      return (
        <Box flex={isLast ? 2 : 1}>
            <Button size={"sm"} alignSelf={isLast ? "flex-end" : "auto"} onPress={() => router.push(item.link)} variant={"solid"} action={"positive"}>
            <ButtonText>
                    {item.text}
            </ButtonText>
        </Button>
        </Box>
      )
    } else {
      return (
        <Link href={item.link}>
          <Heading flex={isLast ? 2 : 1} textAlign={isLast ? "right" : "left"} color={item.color || '$black'} size={"md"}>
           {item.text}
          </Heading>
        </Link>
      )
    }
  } else {
    return <Heading flex={isLast ? 2 : 1} textAlign={isLast ? "right" : "left"}  color={'$black'} size={"md"}>
         {item}
      </Heading>
  }
}

export default TableRowItem