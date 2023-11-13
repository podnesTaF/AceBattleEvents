import CustomDrawerContent from "@Components/CustomDrawerContent";
import LogoTitle from "@Components/LogoTitle";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { usePathname } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";

const Layout = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <Drawer
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#1C1E1F",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown:
          pathname === "/home" ||
          pathname === "/events" ||
          pathname === "/notifications",
        headerLeft: (props) => <DrawerToggleButton {...props} />,
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
        name="rules"
        options={{
          headerShown: false,
          drawerLabel: "ABM Rules",
        }}
      />
      <Drawer.Screen
        name="history"
        options={{
          headerShown: false,
          drawerLabel: "ABM History",
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          headerShown: false,
          drawerLabel: "News",
        }}
      />
    </Drawer>
  );
};

export default Layout;
