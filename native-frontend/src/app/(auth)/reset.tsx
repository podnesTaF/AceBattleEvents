import FormField from "@Components/common/forms/FormField";
import StepLayout from "@Components/join/StepLayout";
import { Box, Center, Heading, Image, VStack } from "@gluestack-ui/themed";
import { useResetPasswordRequestMutation } from "@lib/services";
import { scaleSize } from "@lib/utils";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";

const tabs = ["Enter your email", "Check your mailbox"];

const ResetPass = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");

  const [resetRequest, { isLoading, error }] =
    useResetPasswordRequestMutation();

  const form = useForm<{ email: string }>({
    mode: "onSubmit",
  });

  const router = useRouter();

  const handleNext = async (isSubmit?: boolean) => {
    if (isSubmit && activeTab === 0) {
      await form.handleSubmit(sendResetRequest)();
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

  const sendResetRequest = async (data: { email: string }) => {
    try {
      await resetRequest(email).unwrap();
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
        <Center flex={1} alignItems="center" justifyContent="center">
          <Box py={"$4"}>
            <Heading size="xl">Reset Password</Heading>
          </Box>
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
                        {email}
                      </Heading>{" "}
                      to reset your password.
                    </Heading>
                  </VStack>
                )}
              </StepLayout>
            </FormProvider>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPass;
