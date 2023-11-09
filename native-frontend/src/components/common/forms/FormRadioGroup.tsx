import {
  Box,
  CircleIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormRadioGroupProps {
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  parentLabel: string;
  customOnChange?: (value: string, name: string) => void;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  options,
  name,
  parentLabel,
  customOnChange,
}) => {
  const { control, formState } = useFormContext();

  return (
    <HStack
      space="md"
      py="$2"
      borderBottomWidth={1}
      borderBottomColor="$coolGray300"
    >
      <Box flex={1}>
        <Text size="md">{parentLabel}</Text>
      </Box>
      <Box flex={2}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              onChange={(value) => {
                customOnChange && customOnChange(value, name);
                onChange(value);
              }}
              value={value}
            >
              <VStack space="sm">
                {options.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>{option.label}</RadioLabel>
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          )}
          name={name}
          defaultValue={
            formState.defaultValues ? formState.defaultValues[name] : undefined
          }
        />
      </Box>
    </HStack>
  );
};

export default FormRadioGroup;
