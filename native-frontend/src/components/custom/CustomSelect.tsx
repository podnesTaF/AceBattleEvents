import {
  ChevronDownIcon,
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
} from "@gluestack-ui/themed";
import React from "react";

interface Props {
  items: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  defaultPlaceholder?: string;
  defaultValue?: string;
}

const CustomSelect: React.FC<Props> = ({
  items,
  onChange,
  defaultPlaceholder,
  defaultValue,
}) => {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue || ""}>
      <SelectTrigger variant="underlined" size="sm">
        <SelectInput placeholder={defaultPlaceholder || "Choose a value"} />
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
            <SelectItem key={index} label={item.label} value={item.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default CustomSelect;
