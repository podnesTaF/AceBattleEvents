import YoutubeCard from "@Components/common/YoutubeCard";
import { Center, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { useScreenSize, useTranslatedProvenContent } from "@lib/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import ConceptWrapper from "./ConceptWrapper";

const Proven = () => {
  const { isSmallScreen } = useScreenSize();
  const { t } = useTranslation();
  const provenContent = useTranslatedProvenContent();
  return (
    <ConceptWrapper title={t("concept.provenInUkraine")}>
      <HStack
        pl={"$8"}
        flexWrap="wrap"
        space="md"
        justifyContent="space-around"
      >
        {provenContent.map((p, i) => (
          <VStack key={i} w={"$2/5"}>
            <Heading
              size={isSmallScreen ? "sm" : "md"}
              textAlign="center"
              color="#ff0000"
            >
              {p.title}
            </Heading>
            <Heading size={isSmallScreen ? "xs" : "sm"} textAlign="center">
              {p.subtitle}
            </Heading>
          </VStack>
        ))}
      </HStack>
      <>
        <Heading color="#ff0000" size={isSmallScreen ? "md" : "xl"}>
          {t("concept.whatIsAceBattleMile")}
        </Heading>
        <Center w={"$full"} height={200}>
          <YoutubeCard
            video={{
              videoId: "WSUfPBJf_P4",
              title: "What's Battle Mile Structure and Rules",
            }}
          />
        </Center>
      </>
    </ConceptWrapper>
  );
};

export default Proven;
