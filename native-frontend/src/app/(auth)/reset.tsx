import withWatermarkBg from "@Components/HOCs/withWatermark";
import FormField from "@Components/common/forms/FormField";
import StepLayout from "@Components/join/StepLayout";
import {
  Box,
  Center,
  Heading,
  Image,
  KeyboardAvoidingView,
  VStack,
} from "@gluestack-ui/themed";
import { useResetPasswordRequestMutation } from "@lib/services";
import { scaleSize } from "@lib/utils";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, Platform } from "react-native";

const tabs = ["Enter your email", "Check your mailbox"];

const ResetPass = () => {
  const [activeTab, setActiveTab] = useState(0);
  const height = Dimensions.get("window").height;
  const [submitedEmail, setSubmitedEmail] = useState("");

  const [resetRequest, { isLoading, error }] =
    useResetPasswordRequestMutation();

  const form = useForm<{ email: string }>({
    mode: "onSubmit",
  });

  const router = useRouter();

  const handleNext = async (isSubmit?: boolean) => {
    if (isSubmit && activeTab === 0) {
      await form.handleSubmit(sendResetRequest)();
      if (!submitedEmail) return;
      setActiveTab(1);
    } else if (activeTab === 1) {
      router.replace("/(auth)/login");
    }
  };

  const onBack = () => {
    if (activeTab === 1) {
      setActiveTab(0);
    }
  };

  const sendResetRequest = async ({ email }: { email: string }) => {
    try {
      await resetRequest(email).unwrap();
      setSubmitedEmail(email);
    } catch (error) {
      form.setError("email", { message: "Invalid email" });
    }
  };

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <VStack flex={1} justifyContent="center" alignItems="center">
          <Heading py={"$4"} size="xl">
            Reset Password
          </Heading>
          <Box width={scaleSize(330)}>
            <FormProvider {...form}>
              <StepLayout
                tabName={tabs[activeTab]}
                onNext={handleNext}
                onBack={onBack}
                isFisrt={activeTab === 0}
                isSubmit={activeTab === 0}
                goHome={activeTab === 1}
              >
                {activeTab === 0 && (
                  <Center>
                    <FormField name={"email"} />
                  </Center>
                )}
                {activeTab === 1 && (
                  <VStack
                    space="lg"
                    justifyContent="center"
                    alignItems="center"
                    my={"$4"}
                  >
                    <Heading textAlign="center" size="lg">
                      Check your email
                    </Heading>
                    <Image
                      role="img"
                      source={require("@Assets/images/confirm-email.png")}
                      width={140}
                      height={80}
                      alt="confirm email"
                      resizeMode="contain"
                    />
                    <Heading textAlign="center" size={"sm"}>
                      We have sent an email to{" "}
                      <Heading size="sm" color={"$primary400"}>
                        {submitedEmail}
                      </Heading>{" "}
                      to reset your password.
                    </Heading>
                  </VStack>
                )}
              </StepLayout>
            </FormProvider>
          </Box>
        </VStack>
      </KeyboardAvoidingView>
    </>
  );
};

export default withWatermarkBg(ResetPass);
