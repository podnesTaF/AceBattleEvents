import { Ionicons } from "@expo/vector-icons";
import { Badge, BadgeText, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUnreadCount } from "@lib/notification/slices";
import { selectUser } from "@lib/store";
import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  const user = useAppSelector(selectUser);
  const unreadNotifications = useAppSelector(selectUnreadCount);

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#1C1E1F",
        tabBarActiveTintColor: "#ff0000",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"home"} size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(athletes)"
        options={{
          headerShown: false,
          tabBarLabel: "Athletes",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"body"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          headerShown: false,
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused, size, color }) => (
            <VStack>
              {unreadNotifications > 0 && (
                <Badge
                  size="sm"
                  bg={!focused ? "$red600" : "#1C1E1F"}
                  borderRadius="$full"
                  mb={-14}
                  mr={-14}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                >
                  <BadgeText fontWeight="bold" color="$white">
                    {unreadNotifications}
                  </BadgeText>
                </Badge>
              )}
              <Ionicons name={"notifications"} size={size} color={color} />
            </VStack>
          ),
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          headerShown: false,
          tabBarLabel: "My account",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"person"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
