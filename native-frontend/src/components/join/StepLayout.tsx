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

type StepLayoutProps = {
  children: React.ReactNode;
  tabName: string;
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
  return (
    <VStack
      bg={"$white"}
      softShadow={"1"}
      p={"$4"}
      w={"$full"}
      justifyContent="center"
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
          {onBack && (
            <Box mr={"$2"}>
              <Button
                disabled={isFisrt}
                onPress={onBack}
                variant="outline"
                action="negative"
              >
                <ButtonText>Back</ButtonText>
              </Button>
            </Box>
          )}
          {onNext &&
            (isSubmit ? (
              <Box flex={1} ml={"$2"}>
                <FormButton
                  title={"Submit"}
                  disabled={formState.isSubmitting || !formState.isValid}
                  isLoading={formState.isSubmitting}
                  onPress={() => onNext(isSubmit)}
                />
              </Box>
            ) : (
              <Box flex={1} ml={"$2"}>
                <Button
                  disabled={
                    isSubmit ? !formState.isValid || formState.isLoading : false
                  }
                  onPress={() => onNext(isSubmit)}
                  variant="solid"
                  action="positive"
                >
                  <ButtonText>
                    {isSubmit ? "Submit" : goHome ? "Home" : "Next"}
                  </ButtonText>
                </Button>
              </Box>
            ))}
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

export default StepLayout;
