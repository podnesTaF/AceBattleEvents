import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  FormControl,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  size?: any;
}

const FormCheckbox = ({
  name,
  label,
  defaultValue,
  size,
}: Props): JSX.Element => {
  const { control, formState } = useFormContext();

  return (
    <FormControl
      width={"$full"}
      isInvalid={!!formState.errors[name]}
      size={size}
    >
      <VStack width={"$full"}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size={size}
              aria-label={label}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIcon>
              </CheckboxIndicator>
              <CheckboxLabel>{label}</CheckboxLabel>
            </Checkbox>
          )}
        />
      </VStack>
    </FormControl>
  );
};

export default FormCheckbox;
