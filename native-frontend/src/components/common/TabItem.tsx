import { HStack, Pressable, Text } from "@gluestack-ui/themed";
import React from "react";

interface TabItemProps {
  item: string;
  index: number;
  onPress: (tabIndex: number) => void;
  isLast?: boolean;
  activeIndex?: number;
  size?: "sm" | "md" | "lg";
  activeColor?: string;
  passiveColor?: any;
}

const TabItem: React.FC<TabItemProps> = ({
  item,
  index,
  onPress,
  isLast,
  activeIndex,
  activeColor,
  passiveColor,
  size,
}) => {
  return (
    <Pressable onPress={() => onPress(index)} hitSlop={20}>
      {({ pressed }: { pressed: boolean }) => (
        <HStack
          justifyContent="center"
          py={"$1.5"}
          px={"$3"}
          opacity={pressed ? "$90" : "$100"}
          borderBottomColor={activeColor || "#ff0000"}
          borderBottomWidth={activeIndex === index ? "$2" : "$0"}
          key={index}
        >
          <Text
            fontWeight="600"
            color={
              index === activeIndex
                ? activeColor
                : passiveColor || "$coolGray400"
            }
          >
            {item}
          </Text>
        </HStack>
      )}
    </Pressable>
  );
};

export default TabItem;
