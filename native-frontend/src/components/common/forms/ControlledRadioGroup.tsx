import { Center, Heading, RadioGroup, VStack } from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
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
    <RadioGroup
      onChange={(value) => {
        customOnChange && customOnChange(value, name);
      }}
      value={value || ""}
    >
      <VStack space="md">
        {items?.length ? (
          <FlatList
            data={items}
            ItemSeparatorComponent={() => <Center h={"$1"} />}
            renderItem={({ item, index }) => (
              <ItemRadio
                item={item}
                isLastElement={items.length - 1 === index}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Center flex={1}>
            <Heading size={"xl"} color={"$coolGray400"}>
              There is no {name} to select
            </Heading>
          </Center>
        )}
      </VStack>
    </RadioGroup>
  );
};

export default ControlledRadioGroup;
