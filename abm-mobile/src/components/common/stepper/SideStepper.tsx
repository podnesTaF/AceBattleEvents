import { ScrollView, VStack } from "@gluestack-ui/themed";
import React from "react";
import Step from "./Step";

interface SideStepperProps {
  steps: number[];
  active: number;
  onChange: (v: number) => void;
}

const SideStepper = ({ steps, active, onChange }: SideStepperProps) => {
  return (
    <ScrollView>
      <VStack>
        {steps.map((v, i, arr) => (
          <Step
            key={i}
            isLast={i === arr.length - 1}
            isActive={v === active}
            isFinished={v < active}
            value={v}
            onPress={(v) => onChange(v)}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default SideStepper;
