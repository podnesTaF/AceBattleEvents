import BoxSkeleton from "@Components/common/states/BoxSkeleton";
import { HStack, VStack } from "@gluestack-ui/themed";
import React from "react";

const UserCardSkeleton = ({
  height,
  count,
}: {
  height?: number;
  count?: number;
}): JSX.Element => {
  return (
    <VStack space={"md"}>
      {[...Array(count || 1)].map((_, i) => (
        <HStack
          key={i}
          height={height || "auto"}
          space="md"
          alignItems="center"
        >
          <BoxSkeleton
            width={50}
            height={50}
            borderRadius={25}
            color={undefined}
            style={{}}
          />
          <VStack>
            <BoxSkeleton width={120} height={20} borderRadius={4} />
            <BoxSkeleton
              width={100}
              height={15}
              borderRadius={4}
              style={{ marginTop: 5 }}
            />
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default UserCardSkeleton;
