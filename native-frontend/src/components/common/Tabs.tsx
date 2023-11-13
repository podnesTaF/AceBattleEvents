import { HStack } from "@gluestack-ui/themed";
import React from "react";
import TabItem from "./TabItem";

interface TabsProps {
  activeColor?: string;
  items: string[];
  onChangeTab: (tabIndex: number) => void;
  activeIndex?: number;
  passiveColor?: any;
  size?: "sm" | "md" | "lg";
}

const Tabs: React.FC<TabsProps> = ({
  activeColor,
  items,
  onChangeTab,
  activeIndex,
  passiveColor,
  size,
}) => {
  return (
    <HStack w={"$full"}>
      {items.map((item, index) => (
        <TabItem
          item={item}
          size={size}
          index={index}
          onPress={onChangeTab}
          isLast={index === items.length - 1}
          activeIndex={activeIndex}
          activeColor={activeColor}
          passiveColor={passiveColor}
          key={index}
        />
      ))}
    </HStack>
  );
};

export default Tabs;
