import { msToMinutesAndSeconds } from '@Utils/result-converters';
import { Box, Button, ButtonText, Center, HStack, Heading, Image, Text, VStack } from '@gluestack-ui/themed';
import React from 'react'

interface Props {
    result: any;
}

const PersonalBestCard: React.FC<Props> = ({result}) => {
  return (
    <HStack bgColor='$white' softShadow='1' w={"$full"} minHeight={"$32"}>
        <VStack space='lg' flex={2}>
            <Box justifyContent='center' alignItems='center' width={"$full"} height={"$10"}>
                <Image role={"img"} alt={"vector"} source={require("@Assets/images/title-rect.png")} size={"full"} position='absolute' />
                <Heading size="lg" color={"$white"}>
                    Result:
                </Heading>
            </Box>
            <HStack ml={"$2"} justifyContent='center' space='md'>
                <Text size={"md"}>
                    Date
                </Text>
                <Heading size={"sm"}>
                    23.09.2023
                </Heading>
            </HStack>
            <Box mx="$4" mb={"$4"}>
                <Button action={'primary'} size={"sm"} variant={'solid'}>
                    <ButtonText >View Race</ButtonText>
                </Button>
            </Box>
        </VStack>
        <Center flex={3}>
            <Heading size={"4xl"}>{msToMinutesAndSeconds(result.resultInMs)}</Heading>
        </Center>
    </HStack>
  )
}

export default PersonalBestCard