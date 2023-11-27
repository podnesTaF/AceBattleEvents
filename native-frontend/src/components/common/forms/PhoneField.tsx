import { countryCodes } from "@Constants/country-codes";
import { Box, HStack, Heading, VStack } from "@gluestack-ui/themed";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormField from "./FormField";
import FormSelect from "./FormSelect";

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
}

const PhoneField = ({
  name,
  label,
  defaultValue,
  placeholder,
}: Props): JSX.Element => {
  const { control } = useFormContext();

  return (
    <VStack>
      <Heading size={"sm"}>{label}</Heading>
      <HStack space={"sm"} width={"$full"}>
        <Box flex={1}>
          <FormSelect
            defaultPlaceholder="code"
            name={"countryCode"}
            items={countryCodes}
            defaultValue={defaultValue}
          />
        </Box>
        <Box flex={3}>
          <FormField
            name={name}
            type="text"
            placeholder={placeholder}
            defaultValue={defaultValue}
            variant="underlined"
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default PhoneField;
