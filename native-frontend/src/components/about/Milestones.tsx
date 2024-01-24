import {
  Box,
  Center,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useMilestones, useScreenSize } from "@lib/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import ConceptWrapper from "./ConceptWrapper";

const Milestones = () => {
  const { isSmallScreen } = useScreenSize();
  const { t } = useTranslation();
  const milestones = useMilestones();
  return (
    <ConceptWrapper title={t("concept.milestones")}>
      <ScrollView>
        <Box pl={"$8"} flex={1} p={"$4"} pb={"$20"}>
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
                  <Heading size={isSmallScreen ? "md" : "xl"}>
                    {m.title}
                  </Heading>
                </Center>
                <Center minHeight={"$20"} p={"$4"} flex={3}>
                  <Text size={isSmallScreen ? "md" : "lg"}>{m.text}</Text>
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
