import React from 'react'
import { Box, HStack, Image,Text, VStack, Heading} from '@gluestack-ui/themed'
import { Link } from 'expo-router'

interface TeamProps {
    team: any;
}

const TeamPreview: React.FC<TeamProps> = ({team}) => {
  return (
    <Box flex={1} p={"$2"}>
        <HStack alignItems="center">
        <Box flex={1}>
        <Image
            role={"img"}
            source={{ uri: team.logo.mediaUrl }}
            alt={"team logo"}
            size="xs"
            mr={"$3"}
        />
        </Box>
        <VStack space="sm" flex={5}>
            <Heading size={"md"}>Team {team.name}</Heading>
            <HStack
            justifyContent="space-between"
            alignItems="flex-end"
            >
            <Heading size={"xs"} color="$coolGray300">
                Rank {team.rank}
            </Heading>
            <Link href={"/(modals)/(team)/22"} asChild>
                <Text color="$red500" fontWeight="600">
                visit team page
                </Text>
            </Link>
            </HStack>
        </VStack>
        </HStack>
  </Box>
  )
}

export default TeamPreview