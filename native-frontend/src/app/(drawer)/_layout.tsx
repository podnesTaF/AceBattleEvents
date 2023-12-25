import CustomDrawerContent from "@Components/CustomDrawerContent";
import LogoTitle from "@Components/LogoTitle";
import { usePathname } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";

const Layout = () => {
  const pathname = usePathname();

  return (
    <Drawer
      screenOptions={({ route }) => ({
        drawerInactiveBackgroundColor: "#1C1E1F",
        drawerActiveBackgroundColor: "#3c3c438a",
        drawerActiveTintColor: "#ff0000",
        drawerInactiveTintColor: "#fff",
        drawerStyle: {
          backgroundColor: "#1C1E1F",
        },
        headerStyle: {
          backgroundColor: "#1C1E1F",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "600",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown:
          pathname === "/home" ||
          pathname === "/events" ||
          pathname === "/news" ||
          pathname === "/notifications" ||
          pathname === "/send-notification",
        title: "Ace Battle Mile",
        headerTitle: (props: any) => <LogoTitle {...props} />,
      })}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        key={"homepage"}
        name="(tabs)"
        options={{
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="(events)"
        options={{
          title: "Events",
          drawerLabel: "Events",
        }}
      />
      <Drawer.Screen
        name="concept"
        options={{
          drawerLabel: "About ABM",
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          drawerLabel: "News",
        }}
      />
    </Drawer>
  );
};

export default Layout;
