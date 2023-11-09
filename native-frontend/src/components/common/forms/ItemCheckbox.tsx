import {
  Box,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import React from "react";
import PickItemLabel from "./PickItemLabel";

interface Props {
  item: PickItem;
  isLastElement?: boolean;
}

const ItemCheckbox: React.FC<Props> = ({ item, isLastElement }) => {
  return (
    <Box flex={1}>
      <Checkbox
        aria-label="item-checkbox"
        w={"$full"}
        value={item.id.toString()}
        size="md"
      >
        <PickItemLabel item={item} isLastElement={isLastElement}>
          <CheckboxIndicator ml="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
        </PickItemLabel>
      </Checkbox>
    </Box>
  );
};

export default ItemCheckbox;
