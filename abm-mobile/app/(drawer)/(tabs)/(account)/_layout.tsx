import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router';

const AccountLayout = () => {
    const [user, setUser] = useState();
 

    if(user) {
       return <Stack>
            <Stack.Screen name={'index'} options={{
                headerTitle: "Welcome"
            }} />
<Stack.Screen name={'profile'} options={{
                headerTitle:"User profile"
            }} />
            <Stack.Screen name={'settings'} options={{
                headerTitle:"User Settings"
            }} />
             <Stack.Screen name={'followings'} options={{
                headerTitle:"User Followings"
            }} />
            <Stack.Screen name={'calendar'} options={{
                headerTitle:"User Calendar"
            }} />
        </Stack>
    }
    return (
        <Stack>
           <Stack.Screen name={'index'} options={{
                headerTitle: "Login to see"
            }} />
        </Stack>
    )
    
}

export default AccountLayout