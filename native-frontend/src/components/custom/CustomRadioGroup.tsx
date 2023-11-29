import { Center, Heading, VStack } from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import React from "react";
import { FlatList } from "react-native";
import CustomRadioItem from "./CustomRadioItem";

interface ControlledRadioGroupProps {
  items?: PickItem[];
  name: string;
  value: string | undefined;
  customOnChange: (value: string, name: string) => void;
}

const CustomRadioGroup = ({
  items,
  name,
  value,
  customOnChange,
}: ControlledRadioGroupProps): JSX.Element => {
  const [activeValue, setActiveValue] = React.useState<string | undefined>(
    value
  );
  return (
    <VStack space={"md"}>
      {items?.length ? (
        <FlatList
          data={items}
          ItemSeparatorComponent={() => <Center h={"$1"} />}
          renderItem={({ item, index }) => (
            <CustomRadioItem
              item={item}
              isChosen={activeValue === item.id.toString()}
              onChoose={(value) => {
                setActiveValue(value);
                customOnChange(value, name);
              }}
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
  );
};

export default CustomRadioGroup;
