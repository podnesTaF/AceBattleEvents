import { Box } from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, FlatList } from "react-native";
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
  const windowWidth = Dimensions.get("window").width;
  const tabWidth = windowWidth / items.length;

  const minWidth = windowWidth * 0.3;
  const effectiveTabWidth = Math.max(tabWidth, minWidth);
  return (
    <Box width={"100%"} alignItems="center">
      <FlatList<string>
        data={items}
        horizontal
        snapToAlignment="start"
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        // snapToInterval={effectiveTabWidth}rr
        renderItem={({ item, index }) => (
          <Box minWidth={effectiveTabWidth}>
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
          </Box>
        )}
        keyExtractor={(item, i) => i.toString() + item}
      />
    </Box>
  );
};

export default Tabs;
