import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import UserPreview from "@Components/UserPreview";
import AuthCallToAction from "@Components/auth/AuthCallToAction";
import FormButton from "@Components/common/forms/FormButton";
import ProfileItem from "@Components/profile/ProfileItem";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector, useLogout } from "@lib/hooks";
import { selectIsAuth, selectUser } from "@lib/store";
import { useAccountItems } from "@lib/user/utils/get-account-items";
import { Link, Stack } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, SafeAreaView, StatusBar } from "react-native";

const AccountPage = () => {
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);
  const profilteItems = useAccountItems(user);
  const { t } = useTranslation();
  const [logout, isLoading] = useLogout();
  const isAndroid = Platform.OS === "android";
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <SafeAreaView
              style={{
                backgroundColor: "#1C1E1F",
                paddingTop: isAndroid ? statusBarHeight : 0,
              }}
            >
              {user && isAuth ? (
                <Box p={"$2"}>
                  <UserPreview annotation="personal account" user={user} />
                </Box>
              ) : (
                <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
                  <Box py={"$4"} alignItems="center">
                    <LogoTitle />
                  </Box>
                </SafeAreaView>
              )}
            </SafeAreaView>
          ),
        }}
      />
      <ScrollView>
        {isAuth && user ? (
          <VStack>
            <HStack justifyContent="center" flexWrap="wrap" m={"$4"} space="lg">
              {profilteItems.map((item, i) => (
                <Link key={i} href={item.link} asChild>
                  <Pressable width={"46%"}>
                    <ProfileItem {...item} />
                  </Pressable>
                </Link>
              ))}
            </HStack>
            <Box mx={"$4"}>
              <FormButton
                title={t("auth.logout")}
                onPress={logout}
                isLoading={isLoading}
                w={"$full"}
                variant="outline"
                action="negative"
                icon={LogOut}
              />
            </Box>
          </VStack>
        ) : (
          <VStack flex={1} mt={"$10"}>
            <AuthCallToAction screen="account" />
          </VStack>
        )}
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(AccountPage);
