import { HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import { convertFlagIntoPng } from "@lib/utils";
import React from "react";

interface Props {
  items: {
    label: string;
    labelImage?: string;
    value: string;
  }[];
}

const UserInfoList: React.FC<Props> = ({ items }) => {
  const { isSmallScreen } = useScreenSize();

  return (
    <VStack
      space={"lg"}
      p="$4"
      borderLeftWidth={"$4"}
      bgColor={"$white"}
      borderColor="$red500"
    >
      {items.map((item, i) => (
        <HStack key={i} justifyContent="space-between" alignItems="center">
          <Heading size={isSmallScreen ? "sm" : "md"}>{item.label}</Heading>
          <HStack alignItems="center" space="sm">
            {item.labelImage && (
              <Image
                role={"img"}
                alt={"flag"}
                source={{ uri: convertFlagIntoPng(item.labelImage) }}
                size={isSmallScreen ? "2xs" : "xs"}
                maxHeight={"$7"}
              />
            )}
            <Heading size={"md"}>{item.value}</Heading>
          </HStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default UserInfoList;
