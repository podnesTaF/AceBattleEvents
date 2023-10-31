import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'

const AccountPage = () => {
    const [user, setUser] = useState(true);
    if(user) {
       return <View>
            <Link href={'/(drawer)/(tabs)/(account)/profile'}>
            <Text>Profile</Text>
            </Link>
            <Link href={'/(drawer)/(tabs)/(account)/settings'}>
            <Text>Settings</Text>
            </Link>
            <Link href={'/(drawer)/(tabs)/(account)/followings'}>
            <Text>Followings</Text>
            </Link>
            <Link href={'/(drawer)/(tabs)/(account)/calendar'}>
            <Text>Calendar</Text>
            </Link>
        </View>
    } else {
      return  <View>
            <Link href={'/(drawer)/(tabs)/home'}>
            <Text>Login</Text>
            </Link>
            <Link href={'/(drawer)/(tabs)/home'}>
            <Text>Join us</Text>
            </Link>
        </View>
    }
}

export default AccountPage