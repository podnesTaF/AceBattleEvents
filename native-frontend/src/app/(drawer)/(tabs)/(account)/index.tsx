import withWatermarkBg from "@Components/HOCs/withWatermark";
import HomeTabTitle from "@Components/HomeTabTitle";
import LogoTitle from "@Components/LogoTitle";
import NotAuthTemplate from "@Components/common/NotAuthTemplate";
import ProfileItem from "@Components/profile/ProfileItem";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  HStack,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector, useLogout } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { getAccountItems } from "@lib/user/utils/get-account-items";
import { Link, Stack } from "expo-router";
import { LogOut } from "lucide-react-native";
import React from "react";

const AccountPage = () => {
  const user = useAppSelector(selectUser);
  const logout = useLogout();

  if (user) {
    return (
      <>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#1C1E1F",
            },
            headerTintColor: "#fff",
            headerTitle: () => (
              <Box width={"95%"} my={"$2"}>
                <HomeTabTitle annotation="personal account" user={user} />
              </Box>
            ),
          }}
        />
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
            <Button
              w={"$full"}
              onPress={logout}
              variant="outline"
              action="negative"
            >
              <ButtonIcon mr={"$2"} as={LogOut} />
              <ButtonText>Logout</ButtonText>
            </Button>
          </Box>
        </VStack>
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
        <Center flex={1}>
          <NotAuthTemplate />
        </Center>
      </>
    );
  }
};

export default withWatermarkBg(AccountPage);
