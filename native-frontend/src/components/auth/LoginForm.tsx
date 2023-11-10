import FormButton from "@Components/common/forms/FormButton";
import FormField from "@Components/common/forms/FormField";
import { Text, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@lib/utils";
import { Lock, MailIcon } from "lucide-react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const LoginForm = () => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const login = async (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <VStack w={"$full"} space="md">
        <FormField
          name={"email"}
          label={"Email"}
          placeholder={"Enter your email here"}
          variant="underlined"
          inputProportion={3}
          vertical={true}
          labelIcon={MailIcon}
        />
        <FormField
          name={"password"}
          label={"Password"}
          placeholder={"Enter your password here"}
          type={"password"}
          variant="underlined"
          inputProportion={3}
          vertical={true}
          labelIcon={Lock}
        />
        <FormButton
          marginTop={"$2"}
          title={"Login"}
          isLoading={form.formState.isSubmitting}
          onPress={form.handleSubmit(login)}
        />
        <Text size={"md"}>
          You don't have an account? <Text color={"$primary500"}>Join us</Text>
        </Text>
        <Text size={"md"}>
          Forgot your password? <Text color={"$error500"}>Reset it</Text>
        </Text>
      </VStack>
    </FormProvider>
  );
};

export default LoginForm;
