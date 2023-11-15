import FormButton from "@Components/common/forms/FormButton";
import FormField from "@Components/common/forms/FormField";
import { Text, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@lib/hooks";
import { LoginUserRequest } from "@lib/models";
import { useLoginUserMutation } from "@lib/services";
import { setUser } from "@lib/store";
import { loginSchema } from "@lib/utils";
import { useRouter } from "expo-router";
import { Lock, MailIcon } from "lucide-react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const LoginForm = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<LoginUserRequest>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const login = async (data: LoginUserRequest) => {
    try {
      const res = await loginUser(data).unwrap();

      if (res) {
        dispatch(setUser(res));
      }

      router.replace("/(drawer)/(tabs)/home");
    } catch (err: any) {
      if (err.status === 401) {
        form.setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else {
        console.log(err);
      }
    }
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
          disabled={
            form.formState.isSubmitting || isLoading || !form.formState.isValid
          }
          isLoading={form.formState.isSubmitting || isLoading}
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
