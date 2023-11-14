import { VStack } from "@gluestack-ui/themed";
import React from "react";

const Container = ({
  children,
  vertical,
  borderSize,
}: {
  vertical?: boolean;
  children: React.ReactNode;
  borderSize?: number;
}) => {
  return (
    <VStack
      px={"$3"}
      width={"$full"}
      borderColor="$red500"
      bgColor="$white"
      borderTopWidth={vertical ? 0 : borderSize || 3}
      borderBottomWidth={vertical ? 0 : borderSize || 3}
      borderLeftWidth={vertical ? borderSize || 3 : 0}
    >
      {children}
    </VStack>
  );
};

export default Container;
