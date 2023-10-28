import { View, Text, Button, Image} from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props: any) => {
    return (
        <DrawerContentScrollView style={{backgroundColor: 'primary.500', flex:1}} {...props}>
            <View>
                <View style={{flexDirection: 'row', gap: 4, marginLeft: 16, marginBottom: 16}}>
                <Text style={{fontSize: 24, fontWeight:"600"}}>Ace Battle Mile</Text>
                </View>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent