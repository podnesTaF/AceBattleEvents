import withWatermarkBg from "@Components/HOCs/withWatermark";
import HomeTabTitle from "@Components/HomeTabTitle";
import LogoTitle from "@Components/LogoTitle";
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
import { selectUser } from "@lib/store";
import { getAccountItems } from "@lib/user/utils/get-account-items";
import { Link, Stack } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountPage = () => {
  const user = useAppSelector(selectUser);
  const [logout, isLoading] = useLogout();

  if (user) {
    return (
      <>
        <Stack.Screen
          options={{
            header: () => (
              <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
                <Box p={"$2"}>
                  <HomeTabTitle annotation="personal account" user={user} />
                </Box>
              </SafeAreaView>
            ),
          }}
        />
        <ScrollView>
          <VStack>
            <HStack flexWrap="wrap" m={"$4"} space="lg">
              {getAccountItems(user).map((item, i) => (
                <Link key={i} href={item.link} asChild>
                  <Pressable width={"46%"}>
                    <ProfileItem {...item} />
                  </Pressable>
                </Link>
              ))}
            </HStack>
            <Box mx={"$4"}>
              <FormButton
                title={"Logout"}
                onPress={logout}
                isLoading={isLoading}
                w={"$full"}
                variant="outline"
                action="negative"
                icon={LogOut}
              />
            </Box>
          </VStack>
        </ScrollView>
      </>
    );
  } else {
    return (
      <>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#1C1E1F",
            },
            headerTintColor: "#fff",
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
        <VStack flex={1} mt={"$10"}>
          <AuthCallToAction screen="account" />
        </VStack>
      </>
    );
  }
};

export default withWatermarkBg(AccountPage);
