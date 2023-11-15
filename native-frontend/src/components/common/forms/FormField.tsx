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
  Icon,
  Input,
  InputField,
  InputSlot,
  VStack,
} from "@gluestack-ui/themed";
import { LucideIcon } from "lucide-react-native";

interface FormFieldProps {
  name: string;
  label: string;
  labelIcon?: LucideIcon;
  placeholder?: string;
  type?: "text" | "password" | undefined;
  variant?: "underlined" | "outline" | "rounded";
  size?: any;
  inputProportion?: number;
  customOnChange?: (value: string, name: string) => void;
  defaultValue?: string;
  lines?: number;
  vertical?: boolean;
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
  defaultValue,
  labelIcon,
  vertical,
}) => {
  const { control, formState } = useFormContext();

  return (
    <FormControl isInvalid={!!formState.errors[name]} size={size}>
      <VStack
        minWidth={"$64"}
        maxWidth={vertical ? "$72" : undefined}
        height={vertical ? "$16" : undefined}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {vertical && (
                <FormControlLabel alignSelf="flex-start">
                  {labelIcon && <Icon mr={"$2"} as={labelIcon} size={"md"} />}
                  <FormControlLabelText size={"md"} fontWeight="600">
                    {label}
                  </FormControlLabelText>
                </FormControlLabel>
              )}
              <Input mb={"$1"} variant={variant}>
                {!vertical && (
                  <InputSlot flex={1} alignItems="flex-start">
                    <FormControlLabel>
                      <FormControlLabelText size={"md"} fontWeight="600">
                        {label}
                      </FormControlLabelText>
                    </FormControlLabel>
                  </InputSlot>
                )}
                <InputField
                  type={type || "text"}
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
            </>
          )}
          name={name}
          defaultValue={formState.defaultValues?.[name] || defaultValue || ""}
        />
      </VStack>
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
