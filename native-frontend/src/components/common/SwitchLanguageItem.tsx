import { Heading, Pressable } from "@gluestack-ui/themed";
import React from "react";

interface SwitchLanguageItemProps {
  isActive: boolean;
  name: string;
  onPress: (language: string) => void;
}

const SwitchLanguageItem = ({
  isActive,
  name,
  onPress,
}: SwitchLanguageItemProps): JSX.Element => {
  return (
    <Pressable
      px={"$3"}
      py={"$2"}
      bgColor={isActive ? "$coolGray700" : "#1C1E1F"}
      onPress={() => onPress(name)}
    >
      <Heading size={"md"} color={isActive ? "white" : "$coolGray300"}>
        {name}
      </Heading>
    </Pressable>
  );
};

export default SwitchLanguageItem;
