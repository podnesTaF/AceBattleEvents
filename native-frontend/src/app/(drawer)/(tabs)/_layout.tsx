import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  const user = useAppSelector(selectUser);

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
          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"notifications"} size={size} color={color} />
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
