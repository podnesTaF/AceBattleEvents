import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  AlertCircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | undefined;
  variant?: "underlined" | "outline" | "rounded";
  size?: any;
  inputProportion?: number;
  customOnChange?: (value: string, name: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type,
  variant,
  size,
  inputProportion,
  customOnChange,
}) => {
  const { control, formState } = useFormContext();

  return (
    <FormControl isInvalid={!!formState.errors[name]} mb="$2" size={size}>
      <HStack>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input flex={1} mb={"$1"} variant={variant}>
              <InputSlot flex={1} alignItems="flex-start">
                <FormControlLabel>
                  <FormControlLabelText size={"md"} fontWeight="600">
                    {label}
                  </FormControlLabelText>
                </FormControlLabel>
              </InputSlot>
              <InputField
                flex={inputProportion || 2}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={(text) => {
                  customOnChange && customOnChange(text, name);
                  onChange(text);
                }}
                value={value}
                autoCapitalize="none"
              />
            </Input>
          )}
          name={name}
          defaultValue={
            formState.defaultValues ? formState.defaultValues[name] : ""
          }
        />
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

export default FormField;
