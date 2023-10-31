import { View, Text } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'

const HomeTabTitle = ({user}: {user: boolean}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", gap: 4, paddingHorizontal: 16, width: '100%'}}>
      {user ? (
       <>
        <View>
        <Text style={{color: 'white', fontWeight: '600',fontSize: 16}}>Welcome</Text>
        </View> 
       <Ionicons name={'person'} color={"white"} size={24} />
       </>
      ) : (
       <>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Login
        </Text>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Join us
        </Text>
       </>
      )}
    </View>
  )
}

export default HomeTabTitle