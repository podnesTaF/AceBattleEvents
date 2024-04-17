import { logoBlack } from "@Constants/cloud-images";
import { HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import { scaleSize } from "@lib/utils";
import React from "react";

interface PickItemLabelProps {
  item: PickItem;
  children: React.ReactNode;
  isLastElement?: boolean;
}

const PickItemLabel: React.FC<PickItemLabelProps> = ({
  item,
  isLastElement,
  children,
}) => {
  return (
    <HStack
      w="$full"
      justifyContent="space-between"
      alignItems="center"
      py={"$3"}
      borderBottomWidth={isLastElement ? 0 : 1}
      borderColor="$coolGray300"
    >
      <HStack space={"md"} alignItems="center">
        <Image
          role="img"
          size={"sm"}
          rounded={"$full"}
          source={{
            uri: item.imageUrl || logoBlack,
          }}
          alt={"avatar"}
        />
        <VStack space="sm">
          <Heading size="sm">{item.title}</Heading>
          {item.additionalInfo && (
            <Heading size={"xs"} maxWidth={scaleSize(250)} color="$coolGray300">
              {item.additionalInfo}
            </Heading>
          )}
        </VStack>
      </HStack>
      {children}
    </HStack>
  );
};

export default PickItemLabel;
