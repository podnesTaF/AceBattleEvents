import { Heading, Pressable } from "@gluestack-ui/themed";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

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
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the background color
    Animated.timing(backgroundColorAnim, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // 'useNativeDriver' must be false for color animations
    }).start();
  }, [isActive, backgroundColorAnim]);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1C1E1F", "#3c3c438a"], // Replace with the actual color codes if necessary
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        borderRadius: 12, // Adjust according to your theme
        alignItems: "center",
        paddingVertical: 8, // Adjust according to your theme
        backgroundColor,
      }}
    >
      <Pressable w="$full" alignItems="center" onPress={() => onPress(name)}>
        <Heading size={"md"} color={isActive ? "white" : "$coolGray300"}>
          {name}
        </Heading>
      </Pressable>
    </Animated.View>
  );
};

export default SwitchLanguageItem;
