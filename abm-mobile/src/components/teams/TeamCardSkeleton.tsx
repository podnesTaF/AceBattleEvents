import BoxSkeleton from "@Components/common/states/BoxSkeleton";
import { VStack } from "@gluestack-ui/themed";
import { scaleSize } from "@lib/utils";
import React from "react";

const TeamCardSkeleton = ({
  height,
  count,
}: {
  height?: number;
  count?: number;
}) => {
  return (
    <VStack space={"md"}>
      {[...Array(count || 1)].map((_, i) => (
        <VStack
          key={i}
          height={height || "auto"}
          alignItems="center"
          space="md"
          p={"$4"}
        >
          <BoxSkeleton
            width={scaleSize(300)}
            height={scaleSize(200)}
            borderRadius={4}
          />
          {[...Array(3)].map((_, j) => (
            <BoxSkeleton
              key={j}
              width={scaleSize(300)}
              height={scaleSize(50)}
              borderRadius={4}
              style={{ marginTop: 5 }}
            />
          ))}
        </VStack>
      ))}
    </VStack>
  );
};

export default TeamCardSkeleton;
