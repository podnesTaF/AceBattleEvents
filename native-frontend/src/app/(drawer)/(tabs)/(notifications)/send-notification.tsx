import ErrorBox from "@Components/common/states/ErrorBox";
import SendMessageForm from "@Components/notifications/SendMessageForm";
import { Box, Center, Heading } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { Stack } from "expo-router";
import React from "react";

const SendNotification = () => {
  const user = useAppSelector(selectUser);

  if (!user || user.role !== "manager") {
    return (
      <Center flex={1}>
        <ErrorBox
          errorMessage="You are not allowed to send a notifications"
          type={"forbidden"}
        />
      </Center>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <Heading size="lg" textAlign="center">
              Send a notification
            </Heading>
          ),
        }}
      />
      <Box mt={"$8"}>
        <SendMessageForm />
      </Box>
    </>
  );
};

export default SendNotification;
