import { VStack, Image, Heading } from '@gluestack-ui/themed';
import React from 'react'
import { Pressable } from 'react-native';

interface Props {
    team: any;
    logoHeight?: number;
}

const TeamLogoCard: React.FC<Props> = ({team, logoHeight}) => {
  return (
    <Pressable>
        {({pressed}) => (
        <VStack space={'xs'} alignItems='center' width={"$full"} opacity={pressed ? '$80' : "$100"}>
            <Image role={'img'} source={team.logo.mediaUrl} alt={'team logo'} height={120} width={100}/>
            <Heading size={'sm'} textTransform='uppercase' textAlign='center'>
                {team.name}
            </Heading>
        </VStack>
        )}
    </Pressable>
  )
}

export default TeamLogoCard