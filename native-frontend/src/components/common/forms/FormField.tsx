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
import { useScreenSize } from "@lib/hooks";
import { LucideIcon } from "lucide-react-native";

interface FormFieldProps {
  name: string;
  label?: string;
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
  const { isSmallScreen } = useScreenSize();

  return (
    <FormControl
      width={"$full"}
      isInvalid={!!formState.errors[name]}
      size={size}
    >
      <VStack width={vertical ? "$full" : undefined}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {vertical && label && (
                <FormControlLabel mb={"-$1"} alignSelf="flex-start">
                  {labelIcon && (
                    <Icon
                      mr={"$2"}
                      as={labelIcon}
                      size={isSmallScreen ? "sm" : "md"}
                    />
                  )}
                  <FormControlLabelText
                    size={isSmallScreen ? "sm" : "md"}
                    fontWeight="600"
                  >
                    {label}
                  </FormControlLabelText>
                </FormControlLabel>
              )}
              <Input mb={"$1"} variant={variant}>
                {!vertical && label && (
                  <InputSlot mr={"$2"} flex={1} alignItems="flex-start">
                    <FormControlLabel>
                      <FormControlLabelText
                        size={isSmallScreen ? "sm" : "md"}
                        fontWeight="600"
                      >
                        {label}
                      </FormControlLabelText>
                    </FormControlLabel>
                  </InputSlot>
                )}
                <InputField
                  size={isSmallScreen ? "sm" : "md"}
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
