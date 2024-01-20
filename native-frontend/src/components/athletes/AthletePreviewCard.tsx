import { logoWhite } from "@Constants/cloud-images";
import { Box, HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { IRunner } from "@lib/models";
import { scaleSize } from "@lib/utils";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

interface AthleteProps {
  runner: IRunner;
}

const AthletePreviewCard: React.FC<AthleteProps> = ({ runner }) => {
  const { t } = useTranslation();
  return (
    <VStack w={scaleSize(320)} rounded={"$md"} bg={"$white"} overflow="hidden">
      <Box
        width={"$full"}
        height={"$40"}
        position="relative"
        alignItems="stretch"
      >
        <Image
          style={{ flex: 1 }}
          source={{
            uri: runner.user.image?.mediaUrl || logoWhite,
          }}
          alt={"team preview"}
          contentFit="cover"
          contentPosition={"top"}
        />
      </Box>
      <Box flex={1} p={"$2"}>
        <HStack alignItems="center">
          <VStack flex={1}>
            <Heading size={"md"}>
              {runner.user.name} {runner.user.surname}
            </Heading>
            <HStack justifyContent="space-between" alignItems="flex-end">
              <HStack space={"xl"} justifyContent="space-between">
                <Heading size={"xs"} color="$coolGray300">
                  {runner.teamsAsRunner?.length
                    ? runner.teamsAsRunner[0].name
                    : "-"}
                </Heading>
                <Heading size={"xs"} color="$coolGray300">
                  {t("common.rank")} {runner.rank > 1000 ? "-" : runner.rank}
                </Heading>
              </HStack>
              <Link href={`/(modals)/(profile)/${runner.user.id}`} asChild>
                <Text color="$red500" fontWeight="600">
                  {t("links.visitRunnerProfile")}
                </Text>
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default AthletePreviewCard;
