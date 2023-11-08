import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import React from "react";

interface Props {
  item: PickItem;
  isLastElement?: boolean;
}

const ItemCheckbox: React.FC<Props> = ({ item, isLastElement }) => {
  return (
    <Box flex={1}>
      <Checkbox
        aria-label="item-checkbox"
        w={"$full"}
        value={item.id.toString()}
        size="md"
      >
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
                <Heading size={"xs"} color="$coolGray300">
                  {item.additionalInfo}
                </Heading>
              )}
            </VStack>
          </HStack>
          <CheckboxIndicator ml="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
        </HStack>
      </Checkbox>
    </Box>
  );
};

export default ItemCheckbox;
