import { Box, Heading, Image, VStack } from "@gluestack-ui/themed";
import { useScreenSize, useTranslatedTabs } from "@lib/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import ConceptWrapper from "./ConceptWrapper";

const Transcendent = () => {
  const { isSmallScreen } = useScreenSize();
  const { t } = useTranslation();
  const points = useTranslatedTabs([
    "points.0",
    "points.1",
    "points.2",
    "points.3",
  ]);
  return (
    <ConceptWrapper title={"Transcendent"}>
      <Box w={"$full"} height={isSmallScreen ? 200 : 240}>
        <Image
          source={require("@Assets/images/transcendent.png")}
          size="full"
          height={isSmallScreen ? 200 : 260}
          role={"img"}
          objectFit="contain"
          alt={"slide image"}
        />
      </Box>
      <Box pb={"$1/6"}>
        <Heading size={isSmallScreen ? "md" : "lg"} color="#ff0000">
          {t("concept.bringingTeamBattles")}
        </Heading>
        <VStack space="sm">
          {points.map((p, i) => (
            <Heading size="sm" key={i}>
              {p}
            </Heading>
          ))}
        </VStack>
      </Box>
    </ConceptWrapper>
  );
};

export default Transcendent;
