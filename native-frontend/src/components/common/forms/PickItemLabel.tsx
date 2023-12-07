import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
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
        <Avatar bgColor="$blue400" size="md" borderRadius="$full">
          <AvatarFallbackText>
            {item.title.charAt(0).toUpperCase()}
          </AvatarFallbackText>
          <AvatarImage
            source={{
              uri:
                item.imageUrl ||
                "https://storage.googleapis.com/abe_cloud_storage/image/large/c4bccba0-3f80-4eb5-b50f-63e5cd4f0100.jpg",
            }}
            alt={"avatar"}
          />
        </Avatar>
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
