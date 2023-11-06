import { View, Text } from 'react-native'
import React from 'react'
import { IUser } from '@lib/models'
import UserInfoList from '@Components/common/UserInfoList';
import { getUsersInfo } from '@lib/utils';
import { VStack } from '@gluestack-ui/themed';
import UserContactInfo from '../UserContactInfo';

interface Props {
    user: IUser;
}

const SpectatorBioTab: React.FC<Props> = ({user}) => {
  return (
    <VStack space="lg">
        <UserInfoList items={getUsersInfo(user)} />
        <UserContactInfo user={user} />
    </VStack>
  )
}

export default SpectatorBioTab