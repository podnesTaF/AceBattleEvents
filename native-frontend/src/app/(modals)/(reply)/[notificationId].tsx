import Container from "@Components/common/Container";
import FormField from "@Components/common/forms/FormField";
import FormTextarea from "@Components/common/forms/FormTextarea";
import { notifications } from "@Constants/dummy-data";
import { Box, Button, ButtonText, Heading, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateNotification, createNotificationSchema } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const ReplyModal = () => {
  const { notificationId } = useLocalSearchParams();
  const notification = notifications.find(
    (n) => n.id === Number(notificationId)
  );

  const form = useForm<CreateNotification>({
    mode: "onChange",
    resolver: yupResolver(createNotificationSchema),
  });

  const onSend = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: (props) => (
            <Box py={"$2"}>
              <Heading size="md" color={props.tintColor}>
                Reply to {notification?.sender.name}{" "}
                {notification?.sender.surname}
              </Heading>
            </Box>
          ),
        }}
      />
      <Container vertical={true}>
        <FormProvider {...form}>
          <VStack py={"$4"} space="md">
            <Box>
              <FormField
                name={"title"}
                label={"Title"}
                placeholder={"Enter the title of your message here"}
                variant="underlined"
                inputProportion={4}
              />
            </Box>
            <Box>
              <FormTextarea
                name={"text"}
                label={"Message Text"}
                placeholder={"Enter your message here"}
                lines={4}
              />
            </Box>
            <Button my={"$3"} onPress={form.handleSubmit(onSend)}>
              <ButtonText>
                Reply to {notification?.sender.name}{" "}
                {notification?.sender.surname}
              </ButtonText>
            </Button>
          </VStack>
        </FormProvider>
      </Container>
    </>
  );
};

export default ReplyModal;
