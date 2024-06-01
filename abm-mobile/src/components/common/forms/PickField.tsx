import {
  AlertCircleIcon,
  Box,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  HStack,
  Icon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { ChevronRightCircle } from "lucide-react-native";
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
    <FormControl isInvalid={!!formState.errors[name]} size="md">
      <HStack
        space="md"
        py={"$3"}
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="$coolGray300"
      >
        <Box flex={1} alignItems={"flex-start"}>
          <Text size={"md"} fontWeight="600">
            {label}
          </Text>
        </Box>
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
          <Pressable flex={2}>
            {({ pressed }: { pressed: boolean }) => (
              <HStack
                opacity={pressed ? 0.8 : 1}
                space={"md"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text size={"sm"} fontWeight="600">
                  {placeholder}
                </Text>
                <Icon as={ChevronRightCircle} size="lg" />
              </HStack>
            )}
          </Pressable>
        </Link>
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
