import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Image } from '@gluestack-ui/themed';
import ProfileHeader from '@Components/common/ProfileHeader';
import { testUserSpectator } from '@Constants/dummy-data';
import Tabs from '@Components/common/Tabs';
import SpectatorBioTab from '@Components/user/tabs/SpectatorBioTab';

const tabs = ["BIO", "Teams and Runners"]

const UserProfilePage = () => {
    const params = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState(0);

    const onChangeTab = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

  return (
   <>
    <Stack.Screen
        options={{
            headerTitle: (props) => (
                <Box w={"$full"}>
                    <Box w={"98%"}>
                        <ProfileHeader user={testUserSpectator} />
                    </Box>
                    <Box left={"-$12"}>
                    <Tabs
                        size="md"
                        items={tabs}
                        onChangeTab={onChangeTab}
                        activeIndex={activeTab}
                    />
                    </Box>
                </Box>
            )
         }}
    />
    {activeTab === 0 &&
        <SpectatorBioTab user={testUserSpectator as any} />
    }
    <Image
            source={require("@Assets/images/main-bg.png")}
            role={"img"}
            alt="bg"
            position='absolute'
            size={"full"}
            left={0}
            bottom={0}
            top={0}
            right={0}
            zIndex={-10}
        />
   </>
  )
}

export default UserProfilePage