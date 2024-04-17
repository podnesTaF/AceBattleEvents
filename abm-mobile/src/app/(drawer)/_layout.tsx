import CustomDrawerContent from "@Components/CustomDrawerContent";
import LogoTitle from "@Components/LogoTitle";
import { usePathname } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

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
          drawerLabel: t("navigation.home"),
        }}
      />
      <Drawer.Screen
        name="(events)"
        options={{
          title: "Events",
          drawerLabel: t("navigation.events"),
        }}
      />
      <Drawer.Screen
        name="concept"
        options={{
          drawerLabel: t("navigation.aboutAbm"),
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          drawerLabel: t("navigation.news"),
        }}
      />
    </Drawer>
  );
};

export default Layout;
