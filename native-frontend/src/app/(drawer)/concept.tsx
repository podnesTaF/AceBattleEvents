import CoreConcept from "@Components/about/CoreConcept";
import GetInTouch from "@Components/about/GetInTouch";
import Milestones from "@Components/about/Milestones";
import Proven from "@Components/about/Proven";
import Transcendent from "@Components/about/Transcendent";
import SideStepper from "@Components/common/stepper/SideStepper";
import { Box, HStack, Heading } from "@gluestack-ui/themed";
import Drawer from "expo-router/drawer";
import React, { useState } from "react";

const steps = [0, 1, 2, 3, 4];

const Concept = () => {
  const [active, setActive] = useState(0);
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
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
          {active === 0 && <CoreConcept />}
          {active === 1 && <Transcendent />}
          {active === 2 && <Proven />}
          {active === 3 && <Milestones />}
          {active === 4 && <GetInTouch />}
        </Box>
      </HStack>
    </>
  );
};

export default Concept;
