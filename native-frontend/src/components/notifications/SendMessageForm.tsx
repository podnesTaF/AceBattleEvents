import FormButton from "@Components/common/forms/FormButton";
import FormField from "@Components/common/forms/FormField";
import FormTextarea from "@Components/common/forms/FormTextarea";
import PickField from "@Components/common/forms/PickField";
import {
  Box,
  Heading,
  KeyboardAvoidingView,
  VStack,
} from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import {
  useGetRunnersByManagerQuery,
  usePostUserNotificationMutation,
} from "@lib/services";
import {
  clearAllItems,
  clearAllValues,
  selectUser,
  selectValues,
  setItems,
} from "@lib/store";
import {
  CreateNotification,
  createNotificationSchema,
  cutString,
  mapRunnersToPickItems,
} from "@lib/utils";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const SendMessageForm = () => {
  const user = useAppSelector(selectUser);
  const {
    data: runners,
    isLoading,
    error,
  } = useGetRunnersByManagerQuery(user?.id);
  const dispatch = useAppDispatch();
  const { newValues } = useAppSelector(selectValues);
  const [postNotification, { isLoading: isMessageSending }] =
    usePostUserNotificationMutation();
  const navigator = useNavigation();

  const form = useForm<CreateNotification>({
    mode: "onChange",
    resolver: yupResolver(createNotificationSchema),
  });

  const onSend = async (data: any) => {
    const contents = [
      {
        type: "text",
        text: data.text,
        purpose: "notification",
      },
    ];

    try {
      const { success } = await postNotification({
        title: data.title,
        contents,
        type: "user",
        receivers: data.receivers,
      }).unwrap();
      if (success) {
        form.reset();
        dispatch(clearAllItems());
        dispatch(clearAllValues());
        navigator.goBack();
      }
    } catch (error) {
      form.setError("text", {
        message: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    if (runners) {
      dispatch(
        setItems({
          key: "availableReceivers",
          items: mapRunnersToPickItems(runners),
        })
      );
    }
  }, [runners]);

  useEffect(() => {
    form.setValue("receivers", newValues.receivers);
  }, [newValues.receivers]);

  return (
    <Box px={"$3"} py={"$4"}>
      <Heading size="lg" mb={"$3"}>
        Send Notification
      </Heading>
      <KeyboardAvoidingView>
        <FormProvider {...form}>
          <VStack bgColor="$white" space="md">
            <Box bgColor="$coolGray100" px={"$3"}>
              <PickField
                name="receivers"
                label="Receivers"
                placeholder={
                  newValues.receivers?.length
                    ? cutString(
                        `${newValues.receivers.length} receivers selected`,
                        20
                      )
                    : "No runners selected"
                }
              />
            </Box>
            <VStack space={"md"} px={"$3"}>
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
              <FormButton
                onPress={form.handleSubmit(onSend)}
                title={"Send"}
                isLoading={isMessageSending}
              />
            </VStack>
          </VStack>
        </FormProvider>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default SendMessageForm;
