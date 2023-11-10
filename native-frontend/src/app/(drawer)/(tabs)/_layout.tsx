import HomeTabTitle from "@Components/HomeTabTitle";
import { testUserRunner } from "@Constants/dummy-data";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const Layout = () => {
  const [user, setUser] = useState<any>(testUserRunner);
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"home"} size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#1C1E1F",
            borderBottomEndRadius: 12,
            borderBottomStartRadius: 12,
          },
          headerTintColor: "#fff",
          title: "Ace Battle Mile",
          headerTitle: (props) => <HomeTabTitle user={null} />,
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

const styles = StyleSheet.create({
  headerImage: {
    height: 17,
    alignSelf: "center",
  },
});
