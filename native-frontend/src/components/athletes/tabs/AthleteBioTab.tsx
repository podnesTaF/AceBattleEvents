import React from 'react'
import { VStack, Image, Box, Heading} from '@gluestack-ui/themed'
import { getUsersInfo } from '@lib/utils'
import UserInfoList from '@Components/common/UserInfoList'
import UserContactInfo from '@Components/user/UserContactInfo'

interface AthleteBioTabProps {
    user: any
}

const AthleteBioTab: React.FC<AthleteBioTabProps> = ({user}) => {
  return (
    <Box flex={1}>
        <Box mb={"$4"}>
            <Image role='img' source={{uri: user.image?.mediaUrl}} alt={"athlete large image"} size={"full"} height={210} />
            <UserInfoList items={getUsersInfo(user)} />
        </Box>
       <UserContactInfo user={user} />
    </Box>
  )
}

export default AthleteBioTab