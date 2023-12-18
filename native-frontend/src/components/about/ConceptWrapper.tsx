import { Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import React, { isValidElement } from "react";

const ConceptWrapper = ({ title, secondaryBg, children }: any) => {
  const { isSmallScreen } = useScreenSize();
  return (
    <VStack space={"lg"} justifyContent="space-between" flex={1}>
      <VStack space="md">
        <Heading
          pl={"$10"}
          mx={"$4"}
          maxWidth={"$4/5"}
          fontWeight="bold"
          size={isSmallScreen ? "xl" : "3xl"}
          textTransform="uppercase"
        >
          {title}
        </Heading>
        {isValidElement(children[0]) ? children[0] : null}
      </VStack>
      {isValidElement(children[1]) ? (
        <ScrollView>
          <VStack
            pl={"$12"}
            flex={1}
            bg={secondaryBg || "#fff9ff"}
            p={"$6"}
            space={"md"}
          >
            {children[1]}
          </VStack>
        </ScrollView>
      ) : null}
    </VStack>
  );
};

export default ConceptWrapper;
