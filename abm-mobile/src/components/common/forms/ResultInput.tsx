import { distances } from "@Constants/distances";
import { Box, HStack, Icon, Pressable, VStack } from "@gluestack-ui/themed";
import { MinusCircle } from "lucide-react-native";
import React from "react";
import FormField from "./FormField";
import FormSelect from "./FormSelect";

interface ResultsInputsProps {
  field: {
    distanceInCm: string;
    result: string;
  };
  remove: (index: number) => void;
  i: number;
  name: string;
}

const ResultInput = ({
  field,
  remove,
  i,
  name,
}: ResultsInputsProps): JSX.Element => {
  const { distanceInCm, result } = field;
  return (
    <VStack space={"sm"} w={"$full"}>
      <HStack space={"lg"} alignItems="center">
        <Pressable onPress={() => remove(i)}>
          {({ pressed }: { pressed: boolean }) => (
            <Icon
              as={MinusCircle}
              opacity={pressed ? 0.8 : 1}
              size={"lg"}
              color={"$coolGray400"}
            />
          )}
        </Pressable>
        <Box flex={1}>
          <FormSelect
            name={`${name}.${i}.distanceInCm`}
            defaultValue={
              distances.find((d) => d.value === distanceInCm)?.label || ""
            }
            defaultPlaceholder="Choose di..."
            items={distances}
          />
        </Box>
        <Box flex={1}>
          <FormField
            name={`${name}.${i}.result`}
            placeholder="e.g mm:ss.ms"
            variant="underlined"
            size="sm"
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default ResultInput;
