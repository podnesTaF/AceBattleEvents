import withWatermarkBg from "@Components/HOCs/withWatermark";
import LoginForm from "@Components/auth/LoginForm";
import { Box, Heading, Image, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";

const Login = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "black",
          headerTitle: "",
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <VStack flex={1} alignItems="center" justifyContent="center">
        <Box>
          <Image
            role={"img"}
            source={require("@Assets/images/abm-logo-black.png")}
            alt="logo"
            width={150}
            height={140}
          />
        </Box>
        <Heading size="xl">Sign in</Heading>
        <Box maxWidth={"$72"}>
          <LoginForm />
        </Box>
      </VStack>
    </>
  );
};

export default withWatermarkBg(Login);
