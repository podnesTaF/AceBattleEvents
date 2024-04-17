import Container from "@Components/common/Container";
import FormButton from "@Components/common/forms/FormButton";
import FormField from "@Components/common/forms/FormField";
import { Box, Heading, Text, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserPasswordMutation } from "@lib/services";
import { changePasswordSchema } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, SafeAreaView } from "react-native";

const ChangeUserPassword = () => {
  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();
  const width = Dimensions.get("window").width;

  const { t } = useTranslation();

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
          header: () => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack
                width={width}
                justifyContent="center"
                alignItems="center"
                py="$1"
              >
                <Text color={"#fff"} size="md">
                  {t("accountItems.settings.title")}
                </Text>
                <Heading size="lg" color={"#fff"}>
                  {t("settings.setNewPassword")}
                </Heading>
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <Box my={"$4"}>
        <Container vertical={true}>
          <FormProvider {...form}>
            <VStack>
              <FormField
                name="oldPassword"
                label={t("settings.oldPassword")}
                placeholder={t("settings.enterOldPassword")}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="newPassword"
                label={t("settings.newPassword")}
                placeholder={t("settings.enterNewPassword")}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="confirmPassword"
                inputProportion={1.5}
                label={t("settings.confirmPassword")}
                placeholder={t("settings.enterNewPasswordAgain")}
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
              title={t("common.save")}
            />
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default ChangeUserPassword;
