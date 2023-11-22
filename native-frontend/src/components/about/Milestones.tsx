import { milestones } from "@Constants/info-contents";
import {
  Box,
  Center,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import ConceptWrapper from "./ConceptWrapper";

const Milestones = () => {
  return (
    <ConceptWrapper title={"MILESTONES"}>
      <ScrollView>
        <Box flex={1} p={"$4"} pb={"$20"}>
          <VStack>
            {milestones.map((m, i) => (
              <HStack key={i} borderBottomWidth={1} borderColor="#1e1c1f">
                <Center
                  minHeight={"$20"}
                  p={"$4"}
                  flex={2}
                  borderRightWidth={"$4"}
                  borderColor="#1e1c1f"
                >
                  <Heading size={"xl"}>{m.title}</Heading>
                </Center>
                <Center minHeight={"$20"} p={"$4"} flex={3}>
                  <Text size={"lg"}>{m.text}</Text>
                </Center>
              </HStack>
            ))}
          </VStack>
        </Box>
      </ScrollView>
      <></>
    </ConceptWrapper>
  );
};

export default Milestones;