import {
  AlertCircleIcon,
  Box,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  variant?: "borderless";
  size?: any;
  horizontal?: boolean;
  inputProportion?: number;
  customOnChange?: (value: string, name: string) => void;
  defaultValue?: string;
  lines?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  variant,
  size,
  horizontal,
  inputProportion,
  customOnChange,
  defaultValue,
  lines,
}) => {
  const { control, formState } = useFormContext();
  return (
    <FormControl isInvalid={!!formState.errors[name]} size={size}>
      <Box
        flexDirection={horizontal ? "row" : "column"}
        py={"$2"}
        height={lines ? lines * 40 : 40}
        borderBottomWidth={horizontal ? 1 : 0}
        borderBottomColor="$coolGray300"
        alignItems="center"
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <FormControlLabel alignSelf="flex-start">
                <FormControlLabelText size={"md"} fontWeight="600">
                  {label}
                </FormControlLabelText>
              </FormControlLabel>
              <Textarea
                size="md"
                sx={{
                  borderWidth: 0,
                  _input: {
                    borderWidth: 0,
                  },
                }}
                flex={inputProportion || 2}
              >
                <TextareaInput
                  role="note"
                  type="text"
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    customOnChange && customOnChange(text, name);
                    onChange(text);
                  }}
                  value={value.toString()}
                  autoCapitalize="none"
                  numberOfLines={lines}
                />
              </Textarea>
            </>
          )}
          name={name}
          defaultValue={formState.defaultValues?.[name] || defaultValue || ""}
        />
      </Box>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          {formState.errors[name]?.message}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default FormTextarea;
