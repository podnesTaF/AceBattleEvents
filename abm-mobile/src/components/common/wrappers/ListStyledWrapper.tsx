import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { scaleSize } from "@lib/utils";
import React from "react";

interface ListStyledWrapperProps {
  children: React.ReactNode;
  primaryBgColor?: any;
  title: string;
}

const ListStyledWrapper = ({
  children,
  primaryBgColor,
  title,
}: ListStyledWrapperProps): JSX.Element => {
  return (
    <VStack
      space="md"
      w={"$full"}
      mb={"$1/3"}
      py={"$3"}
      borderTopRightRadius={200}
      borderBottomRightRadius={100}
      bgColor={primaryBgColor || "#ff0000"}
    >
      <Heading color={"$white"} mx={"$4"} size="lg">
        {title}
      </Heading>
      <Box
        p={"$3"}
        bg={"$white"}
        alignSelf="center"
        borderTopRightRadius={scaleSize(50)}
        borderBottomRightRadius={scaleSize(10)}
        borderTopLeftRadius={scaleSize(80)}
        borderBottomLeftRadius={scaleSize(90)}
        borderWidth={2}
        borderColor="$coolGray200"
        width={scaleSize(360)}
        overflow="hidden"
        pl={scaleSize(32)}
        justifyContent="center"
        minHeight={scaleSize(200)}
      >
        {children}
      </Box>
    </VStack>
  );
};

export default ListStyledWrapper;
