import FormButton from "@Components/common/forms/FormButton";
import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform } from "react-native";

type StepLayoutProps = {
  children: React.ReactNode;
  tabName?: string;
  onNext: (isSubmit?: boolean) => void;
  onBack: () => void;
  isSubmit?: boolean;
  isFisrt?: boolean;
  goHome?: boolean;
};

const StepLayout = ({
  children,
  tabName,
  onNext,
  onBack,
  isSubmit,
  goHome,
  isFisrt,
}: StepLayoutProps): JSX.Element => {
  const { formState } = useFormContext();
  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <VStack
        bg={"$white"}
        softShadow={"1"}
        p={"$4"}
        w={"$full"}
        justifyContent="flex-start"
        alignItems="center"
      >
        <VStack
          maxWidth={300}
          w={"$full"}
          mx={"auto"}
          alignItems="center"
          space={"xl"}
        >
          <Heading size={"md"} color={"$coolGray400"}>
            {tabName}
          </Heading>
          <VStack w={"$full"} space={"sm"}>
            {children}
          </VStack>
          <ButtonGroup justifyContent="space-between" w={"$full"}>
            {!goHome ? (
              <Box mr={"$2"}>
                <Button
                  disabled={isFisrt}
                  onPress={onBack}
                  variant="outline"
                  action="negative"
                >
                  <ButtonText>{t("common.back")}</ButtonText>
                </Button>
              </Box>
            ) : (
              <></>
            )}
            {onNext &&
              (isSubmit ? (
                <Box flex={1} ml={"$2"}>
                  <FormButton
                    title={t("common.submit")}
                    disabled={formState.isSubmitting || !formState.isValid}
                    isLoading={formState.isSubmitting}
                    onPress={() => onNext(isSubmit)}
                  />
                </Box>
              ) : (
                <Box flex={1} ml={"$2"}>
                  <Button
                    disabled={
                      isSubmit
                        ? !formState.isValid || formState.isLoading
                        : false
                    }
                    onPress={() => onNext(isSubmit)}
                    variant="solid"
                    action="positive"
                  >
                    <ButtonText>
                      {isSubmit
                        ? t("common.submit")
                        : goHome
                        ? t("common.home")
                        : t("common.next")}
                    </ButtonText>
                  </Button>
                </Box>
              ))}
          </ButtonGroup>
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default StepLayout;
