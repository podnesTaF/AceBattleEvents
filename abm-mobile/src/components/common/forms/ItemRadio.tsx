import {
  Box,
  CircleIcon,
  Radio,
  RadioIcon,
  RadioIndicator,
} from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import React from "react";
import PickItemLabel from "./PickItemLabel";

interface ItemRadioProps {
  item: PickItem;
  isLastElement?: boolean;
}

const ItemRadio: React.FC<ItemRadioProps> = ({ item, isLastElement }) => {
  return (
    <Box flex={1}>
      <Radio w={"$full"} value={item.id.toString()}>
        <PickItemLabel item={item} isLastElement>
          <RadioIndicator mr="$2">
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
        </PickItemLabel>
      </Radio>
    </Box>
  );
};

export default ItemRadio;
