import { infoCards } from "@Constants/info-contents";
import { HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import {
  useAppSelector,
  useScreenSize,
  useTranslatedExplanations,
} from "@lib/hooks";
import { selectLanguage } from "@lib/store";
import React from "react";
import { useTranslation } from "react-i18next";
import ConceptWrapper from "./ConceptWrapper";

const CoreConcept = () => {
  const { isSmallScreen } = useScreenSize();
  const { t } = useTranslation();
  const language = useAppSelector(selectLanguage);

  const explanations = useTranslatedExplanations();

  return (
    <ConceptWrapper title={t("concept.coreConcept")}>
      <HStack pl={"$10"} flexWrap={"wrap"} mx={"$4"} space={"md"}>
        {infoCards.map((inf, i) => (
          <VStack w={"$24"} key={i}>
            <Heading
              textAlign="center"
              color="#ff0000"
              size={isSmallScreen || language !== "en" ? "sm" : "md"}
            >
              {t(`mainPage.infoCards.card${i + 1}.title`)}
            </Heading>
            <Heading
              textAlign="center"
              size={isSmallScreen || language !== "en" ? "xs" : "sm"}
            >
              {t(`mainPage.infoCards.card${i + 1}.subtitle`)}
            </Heading>
          </VStack>
        ))}
      </HStack>
      <>
        {explanations.map((e, i) => (
          <HStack alignItems="center" key={i} space={"md"}>
            <Heading
              color={"$coolGray400"}
              size={isSmallScreen ? "2xl" : "4xl"}
            >
              {i + 1}
            </Heading>
            <Text
              flex={1}
              size={isSmallScreen || language !== "en" ? "sm" : "md"}
            >
              {e}
            </Text>
          </HStack>
        ))}
      </>
    </ConceptWrapper>
  );
};

export default CoreConcept;
