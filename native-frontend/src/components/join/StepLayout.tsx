import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";

type StepLayoutProps = {
  children: React.ReactNode;
  tabName: string;
  onNext: (isSubmit?: boolean) => void;
  onBack: () => void;
  isSubmit?: boolean;
};

const StepLayout = ({
  children,
  tabName,
  onNext,
  onBack,
  isSubmit,
}: StepLayoutProps): JSX.Element => {
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
        maxWidth={350}
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
            <Box flex={1} mr={"$2"}>
              <Button onPress={onBack} variant="outline" action="negative">
                <ButtonText>Back</ButtonText>
              </Button>
            </Box>
          )}
          {onNext && (
            <Box flex={1} ml={"$2"}>
              <Button
                onPress={() => onNext(isSubmit)}
                variant="outline"
                action="positive"
              >
                <ButtonText>{isSubmit ? "Submit" : "Next"}</ButtonText>
              </Button>
            </Box>
          )}
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

export default StepLayout;
