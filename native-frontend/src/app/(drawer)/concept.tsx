import CoreConcept from "@Components/about/CoreConcept";
import GetInTouch from "@Components/about/GetInTouch";
import Milestones from "@Components/about/Milestones";
import Proven from "@Components/about/Proven";
import Transcendent from "@Components/about/Transcendent";
import SideStepper from "@Components/common/stepper/SideStepper";
import { Box, HStack, Heading } from "@gluestack-ui/themed";
import Drawer from "expo-router/drawer";
import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const steps = [0, 1, 2, 3, 4];

const renderTabContent = (index: number) => {
  switch (index) {
    case 0:
      return <CoreConcept key={index} />;
    case 1:
      return <Transcendent key={index} />;
    case 2:
      return <Proven key={index} />;
    case 3:
      return <Milestones key={index} />;
    case 4:
      return <GetInTouch key={index} />;
    default:
      return null;
  }
};

const Concept = () => {
  const [active, setActive] = useState(0);

  const opacityAnim = useRef(steps.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animate the active tab content to fade in
    Animated.timing(opacityAnim[active], {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Optionally, fade out the inactive tab contents
    steps.forEach((step, index) => {
      if (index !== active) {
        Animated.timing(opacityAnim[index], {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [active, opacityAnim]);

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
          drawerLabel: "About ABM",
          headerStyle: {
            backgroundColor: "#ff0000",
            borderBottomRightRadius: active !== 4 ? 80 : 0,
          },

          headerTitle: ({ tintColor }) => (
            <Heading color={tintColor} textAlign="center">
              About ABM
            </Heading>
          ),
        }}
      />
      <HStack flex={1}>
        <Box bgColor={"#ff0000"} px={"$1"} py={"$3"}>
          <SideStepper
            active={active}
            onChange={(v) => setActive(v)}
            steps={steps}
          />
        </Box>
        <Box flex={1}>
          {steps.map(
            (_, index) =>
              active === index && (
                <Animated.View
                  key={index}
                  style={{
                    flex: 1,
                    opacity: opacityAnim[index],
                  }}
                >
                  {renderTabContent(index)}
                </Animated.View>
              )
          )}
        </Box>
      </HStack>
    </>
  );
};

export default Concept;
