import FormButton from "@Components/common/forms/FormButton";
import FormField from "@Components/common/forms/FormField";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@lib/hooks";
import { LoginUserRequest } from "@lib/models";
import { api, useLoginUserMutation } from "@lib/services";
import { setUser } from "@lib/store";
import { loginSchema } from "@lib/utils";
import { Link, useRouter } from "expo-router";
import { Lock, MailIcon } from "lucide-react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const form = useForm<LoginUserRequest>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const login = async (data: LoginUserRequest) => {
    try {
      const res = await loginUser(data).unwrap();
      dispatch(api.util.resetApiState());
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
          label={t("auth.email")}
          placeholder={t("auth.enterYourEmail")}
          variant="underlined"
          inputProportion={3}
          vertical={true}
          labelIcon={MailIcon}
        />
        <FormField
          name={"password"}
          label={t("auth.password")}
          placeholder={t("auth.enterYourPassword")}
          type={"password"}
          variant="underlined"
          inputProportion={3}
          vertical={true}
          labelIcon={Lock}
        />
        <FormButton
          marginTop={"$2"}
          title={t("auth.login")}
          disabled={
            form.formState.isSubmitting || isLoading || !form.formState.isValid
          }
          isLoading={form.formState.isSubmitting || isLoading}
          onPress={form.handleSubmit(login)}
        />
        <HStack space={"md"} alignItems="center">
          <Text size="md">{t("auth.noAccount")}</Text>
          <Link href={"/join"}>
            <Text color={"$primary500"}>{t("auth.joinUs")}</Text>
          </Link>
        </HStack>
        <HStack space={"md"} alignItems="center">
          <Text size="md"> {t("auth.forgotPassword")} </Text>
          <Link href={"/(auth)/reset"} asChild>
            <Text size="md" color={"$error500"}>
              {t("auth.resetIt")}
            </Text>
          </Link>
        </HStack>
      </VStack>
    </FormProvider>
  );
};

export default LoginForm;
