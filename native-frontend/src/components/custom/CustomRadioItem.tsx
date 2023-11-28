import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { PickItem } from "@lib/types";
import { CheckIcon } from "lucide-react-native";
import React from "react";

interface CustomRadioItemProps {
  item: PickItem;
  isLastElement?: boolean;
  onChoose: (value: string) => void;
  isChosen?: boolean;
}

const CustomRadioItem = ({
  item,
  isLastElement,
  isChosen,
  onChoose,
}: CustomRadioItemProps): JSX.Element => {
  return (
    <Box flex={1}>
      <Pressable onPress={() => onChoose(item.id.toString())}>
        <HStack
          w="$full"
          justifyContent="space-between"
          alignItems="center"
          py={"$3"}
          borderBottomWidth={isLastElement ? 0 : 1}
          borderColor="$coolGray300"
        >
          <HStack space={"md"} alignItems="center">
            {item.imageUrl && (
              <Avatar bgColor="$blue400" size="md" borderRadius="$full">
                <AvatarImage
                  source={{
                    uri: item.imageUrl,
                  }}
                  alt={"avatar"}
                />
              </Avatar>
            )}
            <VStack space="sm">
              <Heading size="sm">{item.title}</Heading>
              {item.additionalInfo && (
                <Heading size={"xs"} color="$coolGray300">
                  {item.additionalInfo}
                </Heading>
              )}
            </VStack>
          </HStack>
          <Box w={"$8"}>
            {isChosen && <Icon as={CheckIcon} size="lg" color="$green500" />}
          </Box>
        </HStack>
      </Pressable>
    </Box>
  );
};

export default CustomRadioItem;
