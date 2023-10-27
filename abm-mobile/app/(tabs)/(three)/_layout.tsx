import { View, Text, Platform, Pressable } from 'react-native'
import React, { useState } from 'react';
import {Drawer} from 'expo-router/drawer'; 
import { Link, Slot } from 'expo-router';
const Layout = () => {
    const [hover,setHover] = useState<number | undefined>()

    const handleHover = (state: number | undefined) => {
        setHover(state)
    }

  if(Platform.OS === 'web') {
    return (
        <div style={{flex: 1}}>
           <header>
             <div
                style={{
                    display: 'flex',
                    gap: 10,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#c7c7c7"
                }}
             >
                <Link href={'/page1'} asChild>
                    <Pressable onHoverIn={() => handleHover(0)} onHoverOut={() => handleHover(undefined)}>
                        <Text style={{backgroundColor: hover === 0 ? "lightblue" : ""}}>
                            Page 1
                        </Text>
                    </Pressable>
                </Link>
                <Link href={'/page2'} asChild>
                    <Pressable onHoverIn={() => handleHover(1)} onHoverOut={() => handleHover(undefined)}>
                        <Text style={{backgroundColor: hover === 1 ? "lightblue" : ""}}>
                            Page 2
                        </Text>
                    </Pressable>
                </Link>
             </div>
           </header>
           <Slot />
        </div>
    )
  } else {
    return (
        <Drawer>
            <Drawer.Screen
                name="page1"
                options={{
                    headerTitle: "My Newsfeed",
                    drawerLabel: "News"
                }}
            />
            <Drawer.Screen
                name="page2"
                options={{
                    headerTitle: "Notifications",
                    drawerLabel: "Notifications"
                }}
            />
        </Drawer>
      )
  }
}

export default Layout