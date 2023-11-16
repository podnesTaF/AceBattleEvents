import {
  Center,
  Heading,
  RadioGroup,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import React from "react";
import ItemRadio from "./ItemRadio";

interface ControlledRadioGroupProps {
  items?: PickItem[];
  name: string;
  value: string | undefined;
  customOnChange: (value: string, name: string) => void;
}

const ControlledRadioGroup: React.FC<ControlledRadioGroupProps> = ({
  value,
  items,
  name,
  customOnChange,
}) => {
  return (
    <ScrollView>
      <RadioGroup
        onChange={(value) => {
          customOnChange && customOnChange(value, name);
        }}
        value={value || ""}
      >
        <VStack space="md">
          {items?.length ? (
            items.map((item, i) => (
              <ItemRadio
                key={item.id}
                item={item}
                isLastElement={items.length - 1 === i}
              />
            ))
          ) : (
            <Center flex={1}>
              <Heading size={"xl"} color={"$coolGray400"}>
                There is no {name} to select
              </Heading>
            </Center>
          )}
        </VStack>
      </RadioGroup>
    </ScrollView>
  );
};

export default ControlledRadioGroup;
