import { VStack } from "@gluestack-ui/themed";
import React from "react";

const Container = ({
  children,
  vertical,
  borderColor,
  borderSize,
}: {
  vertical?: boolean;
  children: React.ReactNode;
  borderSize?: number;
  borderColor?: any;
}) => {
  return (
    <VStack
      px={"$3"}
      width={"$full"}
      borderColor={borderColor || "$red500"}
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
