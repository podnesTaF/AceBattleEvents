import {
  AddIcon,
  AlertCircleIcon,
  Box,
  Button,
  ButtonIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import React from "react";
import { useFormContext } from "react-hook-form";

interface PickFieldProps {
  name: string;
  label: string;
  placeholder: string;
  multiple?: boolean;
}

const PickField: React.FC<PickFieldProps> = ({
  name,
  label,
  placeholder,
  multiple,
}) => {
  const { formState } = useFormContext();

  return (
    <FormControl isInvalid={!!formState.errors[name]} mb={"$2"} size="md">
      <HStack
        space="md"
        mb="$1"
        borderBottomWidth={1}
        borderBottomColor="$coolGray300"
      >
        <Box flex={1} alignItems={"flex-start"}>
          <Text size={"md"} fontWeight="600">
            {label}
          </Text>
        </Box>
        <HStack space={"md"} justifyContent="space-between" flex={2}>
          <Text size={"sm"} fontWeight="600">
            {placeholder}
          </Text>
          <Link
            href={{
              pathname: "/(modals)/(pick)/pick-items" as any,
              params: {
                name,
                multiple: multiple ? "true" : "false",
              },
            }}
            asChild
          >
            <Button size="sm" rounded="$full" p={"$1"}>
              <ButtonIcon as={AddIcon} size="sm" />
            </Button>
          </Link>
        </HStack>
      </HStack>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          {formState.errors[name]?.message}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default PickField;
