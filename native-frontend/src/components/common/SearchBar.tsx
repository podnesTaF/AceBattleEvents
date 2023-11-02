import React from "react";
import {
  Input,
  InputSlot,
  InputField,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  variant: 'white' | 'dark'
}

const searchVariants = {
  "dark": {
    bg: "#1C1E1F",
    color: "$coolGray200",
    icon: "gray"
  },
  "white" : {
    bg: "$white",
    color: "$coolGray400",
    icon: "gray"
  }
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  value,
  variant
}) => {
  return (
    <Input sx={{
        borderBottomWidth: 1,
        borderColor: "$coolGray400",
        ":focus": {
          borderColor: "$white"
        }
      }} bg={searchVariants[variant].bg} variant="underlined">
      <InputSlot px="$2">
        <Ionicons name={'search'} size={24} color={searchVariants[variant].icon} />
      </InputSlot>
      <InputField  placeholder={placeholder} color={searchVariants[variant].color} value={value} onChangeText={(text) => onChange(text)} />
    </Input>
  );
};

export default SearchBar;
