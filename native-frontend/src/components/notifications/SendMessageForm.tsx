import FormField from "@Components/common/forms/FormField";
import FormTextarea from "@Components/common/forms/FormTextarea";
import {
  Box,
  Button,
  ButtonText,
  Heading,
  KeyboardAvoidingView,
  VStack,
} from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateNotification, createNotificationSchema } from "@lib/utils";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const SendMessageForm = () => {
  const form = useForm<CreateNotification>({
    mode: "onChange",
    resolver: yupResolver(createNotificationSchema),
  });

  const onSend = async (data: any) => {
    console.log(data);
  };

  return (
    <Box px={"$3"} py={"$4"}>
      <Heading size="lg">Send Notification</Heading>
      <KeyboardAvoidingView>
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
              <ButtonText>Send</ButtonText>
            </Button>
          </VStack>
        </FormProvider>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default SendMessageForm;
