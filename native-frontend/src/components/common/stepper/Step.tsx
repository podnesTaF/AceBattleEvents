import { Box, Divider, Pressable, VStack } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface StepProps {
  value: number;
  isActive: boolean;
  isLast: boolean;
  isFinished: boolean;
  onPress: (v: number) => void;
}

const Step = ({ isActive, isLast, isFinished, onPress, value }: StepProps) => {
  const lineAnimation = useSharedValue(0);
  const runOpacity = useSharedValue(0);

  useEffect(() => {
    lineAnimation.value = withTiming(isFinished ? 80 : 0, {
      duration: 300,
      easing: Easing.linear,
    });
  }, [isFinished, lineAnimation]);

  useEffect(() => {
    runOpacity.value = withTiming(isActive ? 1 : 0, {
      duration: 600,
      easing: Easing.linear,
    });
  }, [isActive, runOpacity]);

  const animatedBlackLineStyle = useAnimatedStyle(() => ({
    backgroundColor: isFinished ? "$black" : "$white",
    width: 2,
    height: lineAnimation.value,
  }));

  const animatedRunnerOpacity = useAnimatedStyle(() => ({
    opacity: runOpacity.value,
  }));

  return (
    <VStack space={"sm"} alignItems="center">
      <Pressable onPress={() => onPress(value)}>
        {({ pressed }: { pressed: boolean }) => (
          <Box
            softShadow={pressed ? "1" : undefined}
            borderWidth={2}
            borderColor={isActive ? "$black" : "$coolGray200"}
            rounded={"$full"}
            h={"$10"}
            w={"$10"}
            bg={isFinished ? "#1A1C1F" : "$white"}
          >
            {isActive && (
              <Animated.View style={[animatedRunnerOpacity]}>
                <Image
                  contentFit="contain"
                  contentPosition={"center"}
                  style={{
                    height: 36,
                    width: 36,
                  }}
                  source={require("@Assets/images/active-step.png")}
                  alt={"st"}
                />
              </Animated.View>
            )}
          </Box>
        )}
      </Pressable>
      {!isLast && (
        <VStack height={"$20"} width={"$0.5"} mb={"$1"}>
          <Divider
            orientation="vertical"
            bg="$white"
            w={"$0.5"}
            height={"$full"}
          />
          {/* Black line (animated) */}
          <Animated.View
            style={[
              animatedBlackLineStyle,
              { position: "absolute", zIndex: 10 },
            ]}
          >
            <Divider
              orientation="vertical"
              bg={"$black"}
              mb={"$2"}
              w={"$0.5"}
            />
          </Animated.View>
        </VStack>
      )}
    </VStack>
  );
};

export default Step;
