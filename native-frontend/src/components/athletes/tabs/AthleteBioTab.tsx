import React from 'react'
import { VStack, Image, Box, HStack, Heading} from '@gluestack-ui/themed'
import { formatDate } from '@lib/utils'
import { convertFlagIntoPng } from '@lib/utils'

interface AthleteBioTabProps {
    user: any
}

const AthleteBioTab: React.FC<AthleteBioTabProps> = ({user}) => {
  return (
    <Box flex={1}>
        <Box mb={"$4"}>
            <Image role='img' source={{uri: user.image?.mediaUrl}} alt={"athlete large image"} size={"full"} height={210} />
            <VStack  space={"lg"} p="$4" borderLeftWidth={'$4'} bgColor={"$white"} borderColor='$red500'>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Heading size={"md"}>
                        Nationality
                    </Heading>
                    <HStack alignItems='center' space='sm'>
                        {user.country?.flagIconUrl && (
                            <Image role={"img"} alt={"flag"} source={{uri: convertFlagIntoPng(user.country.flagIconUrl)}} size={"xs"} maxHeight={"$7"} />
                        )}
                        <Heading size={"md"}>
                            {user.country.name}
                        </Heading>
                    </HStack>
                </HStack>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Heading size={"md"}>
                         Date Of Birth
                    </Heading>
                    <HStack alignItems='center' space='sm'>
                        <Heading size={"md"}>
                            {formatDate(user.runner.dateOfBirth, false)}
                        </Heading>
                    </HStack>
                </HStack>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Heading size={"md"}>
                        Gender
                    </Heading>
                    <HStack alignItems='center' space='sm'>
                        <Heading size={"md"}>
                            {user.runner?.gender?.toUpperCase()}
                        </Heading>
                    </HStack>
                </HStack>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Heading size={"md"}>
                        Rank
                    </Heading>
                    <HStack alignItems='center' space='sm'>
                        <Heading size={"md"}>
                            {user.runner?.rank}
                        </Heading>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
        <VStack space="md" flex={1}>
            <Heading mx={"$3"}>
                Contact info
            </Heading>
            <VStack w={"$full"} space={"lg"} p="$4" borderLeftWidth={'$4'} bgColor={"$white"} borderColor='$red500'>
                <Heading>email: {user.email}</Heading>
                <Heading>phone: +32032219621</Heading>
            </VStack>
        </VStack>
    </Box>
  )
}

export default AthleteBioTab