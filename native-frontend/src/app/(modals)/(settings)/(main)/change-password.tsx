import Container from "@Components/common/Container";
import FormButton from "@Components/common/forms/FormButton";
import FormField from "@Components/common/forms/FormField";
import { Box, Heading, Text, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserPasswordMutation } from "@lib/services";
import { changePasswordSchema } from "@lib/utils";
import { Stack } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const ChangeUserPassword = () => {
  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();
  const navigation = useNavigation();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (dto: any) => {
    try {
      await updatePassword(dto).unwrap();
    } catch (error) {
      form.setError("root", {
        message: "There was error accur while changing password",
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => (
            <VStack py="$1">
              <Text color={props.tintColor} size="md">
                Settings
              </Text>
              <Heading size="lg" color={props.tintColor}>
                Set New Password
              </Heading>
            </VStack>
          ),
        }}
      />
      <Box my={"$4"}>
        <Container vertical={true}>
          <FormProvider {...form}>
            <VStack>
              <FormField
                name="oldPassword"
                label={"Old password"}
                placeholder={"Enter your old password"}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="newPassword"
                label={"New Password"}
                placeholder={"Enter your surname"}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="confirmPassword"
                inputProportion={1.5}
                label={"Confirm Password"}
                placeholder={"Enter your city"}
                variant={"underlined"}
                size={"md"}
              />
            </VStack>
            <FormButton
              isDisabled={
                !form.formState.isValid || form.formState.isSubmitting
              }
              isLoading={form.formState.isSubmitting || isLoading}
              onPress={form.handleSubmit(onSubmit)}
              title={"Save"}
            />
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default ChangeUserPassword;
