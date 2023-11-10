import { CheckboxGroup, ScrollView, VStack } from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import React from "react";
import ItemCheckbox from "./ItemCheckbox";

interface Props {
  items: PickItem[];
  name: string;
  value: string[];
  customOnChange: (value: string[], name: string) => void;
}

const ControlledCheckboxGroup: React.FC<Props> = ({
  items,
  name,
  value,
  customOnChange,
}) => {
  return (
    <ScrollView>
      <CheckboxGroup
        value={value}
        onChange={(value: string[]) => customOnChange(value, name)}
      >
        <VStack space={"md"}>
          {items.map((item: PickItem, i) => (
            <ItemCheckbox
              key={item.id}
              item={item}
              isLastElement={items.length - 1 === i}
            />
          ))}
        </VStack>
      </CheckboxGroup>
    </ScrollView>
  );
};

export default ControlledCheckboxGroup;
