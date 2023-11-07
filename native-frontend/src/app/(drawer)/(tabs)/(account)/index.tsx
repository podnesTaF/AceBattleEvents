import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { Box, HStack, Pressable } from "@gluestack-ui/themed";
import { getAccountItems } from "@lib/user/utils/get-account-items";
import {
  testUserRunner,
  testUserSpectator,
  textUserManager,
  users,
} from "@Constants/dummy-data";
import ProfileItem from "@Components/profile/ProfileItem";
import HomeTabTitle from "@Components/HomeTabTitle";

const AccountPage = () => {
  const [user, setUser] = useState<any>(textUserManager);
  if (user) {
    return (
      <>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#1C1E1F",
            },
            headerTitle: () => (
              <Box width={"95%"} my={"$2"}>
                <HomeTabTitle user={user} />
              </Box>
            ),
          }}
        />
        <HStack flexWrap="wrap" m={"$4"} space="lg">
          {getAccountItems(user).map((item, i) => (
            <Link key={i} href={item.link} asChild>
              <Pressable width={'46%'}>
                <ProfileItem {...item} />
              </Pressable>
            </Link>
          ))}
        </HStack>
      </>
    );
  } else {
    return (
      <View>
        <Link href={"/(drawer)/(tabs)/home"}>
          <Text>Login</Text>
        </Link>
        <Link href={"/(drawer)/(tabs)/home"}>
          <Text>Join us</Text>
        </Link>
      </View>
    );
  }
};

export default AccountPage;
