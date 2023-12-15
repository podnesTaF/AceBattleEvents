import { Ionicons } from "@expo/vector-icons";
import { Input, InputField, InputSlot } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SearchBarProps {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  variant: "white" | "dark";
}

const searchVariants = {
  dark: {
    bg: "#1C1E1F",
    color: "$coolGray200",
    icon: "gray",
  },
  white: {
    bg: "$white",
    color: "$coolGray400",
    icon: "gray",
  },
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  value,
  variant,
}) => {
  return (
    <TouchableOpacity hitSlop={20}>
      <Input
        mb={"$2"}
        sx={{
          borderBottomWidth: 1,
          borderColor: "$coolGray400",
          ":focus": {
            borderColor: "$white",
          },
        }}
        bg={searchVariants[variant].bg}
        variant="underlined"
      >
        <InputSlot px="$2">
          <Ionicons
            name={"search"}
            size={24}
            color={searchVariants[variant].icon}
          />
        </InputSlot>

        <InputField
          placeholder={placeholder}
          color={searchVariants[variant].color}
          value={value}
          onChangeText={(text) => onChange(text)}
        />
      </Input>
    </TouchableOpacity>
  );
};

export default SearchBar;
