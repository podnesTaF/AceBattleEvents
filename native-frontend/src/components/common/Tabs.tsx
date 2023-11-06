import { Box, HStack, Text } from "@gluestack-ui/themed";
import React from "react";
import { Pressable } from "react-native";
import TabItem from "./TabItem";

interface TabsProps {
  activeColor?: string;
  items: string[];
  onChangeTab: (tabIndex: number) => void;
  activeIndex: number;
  size?: "sm" | "md" | "lg"
}

const Tabs: React.FC<TabsProps> = ({
  activeColor,
  items,
  onChangeTab,
  activeIndex,
  size
}) => {
  return (
    <HStack w={"$full"} left={"-$4"}>
      {items.map((item, index) => (
        <TabItem
          item={item}
          size={size}
          index={index}
          onPress={onChangeTab}
          isLast={index === items.length - 1}
          activeIndex={activeIndex}
          activeColor={activeColor}
          key={index}
        />
      ))}
    </HStack>
  );
};

export default Tabs;
