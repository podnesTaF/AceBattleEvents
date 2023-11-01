import React from "react";
import {
  Input,
  InputSlot,
  InputIcon,
  InputField,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  value,
}) => {
  return (
    <Input bg={"$white"}>
      <InputSlot pl="$3">
        <Ionicons name={'search'} size={24} color={'gray'} />
      </InputSlot>
      <InputField placeholder={placeholder} value={value} onChangeText={(text) => onChange(text)} />
    </Input>
  );
};

export default SearchBar;
