import {
  Box,
  Heading,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ChevronDownIcon } from "lucide-react-native";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  items: {
    label: string;
    value: string;
  }[];
  name: string;
  defaultPlaceholder?: string;
  defaultValue?: string;
  label?: string;
}

const FormSelect = ({
  items,
  name,
  defaultPlaceholder,
  defaultValue,
  label,
}: Props): JSX.Element => {
  const { control, formState } = useFormContext();

  return (
    <VStack w={"$full"} space={"md"}>
      <Heading size={"sm"}>{label}</Heading>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select defaultValue={defaultValue || ""}>
            <SelectTrigger variant="underlined" size="sm">
              <SelectInput
                placeholder={defaultPlaceholder || "Choose a value"}
              />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {defaultPlaceholder && (
                  <SelectItem label={defaultPlaceholder} value="" />
                )}
                {items.map((item, index) => (
                  <SelectItem
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
      />
      <Box>
        {formState.errors[name] && (
          <Text color="red">{formState.errors[name]?.message}</Text>
        )}
      </Box>
    </VStack>
  );
};

export default FormSelect;
