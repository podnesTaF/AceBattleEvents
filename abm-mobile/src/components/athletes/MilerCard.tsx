import { logoBlack } from "@Constants/cloud-images";
import { Box, HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { useScreenSize } from "@lib/hooks";
import { IRunner } from "@lib/models";
import { msToMinutesAndSeconds, scaleSize } from "@lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

const MilerCard = ({
  runner,
  resultInMs,
}: {
  runner: IRunner;
  resultInMs: number;
}) => {
  const { isSmallScreen } = useScreenSize();
  const { t } = useTranslation();
  return (
    <HStack bgColor="$white" borderRightWidth={2} borderColor="#ff0000">
      <Box flex={2}>
        <Image
          role={"img"}
          alt="sportsman image"
          source={{ uri: runner.user.image?.mediaUrl || logoBlack }}
          objectFit="cover"
          height={140}
          size={"full"}
        />
      </Box>
      <VStack flex={3} p={"$4"} px={"$6"} space="sm">
        <Heading fontSize={scaleSize(20)}>
          {runner.user.name} {runner.user.surname}
        </Heading>
        <HStack justifyContent="space-between" space="lg">
          <Heading fontSize={scaleSize(16)} textTransform="uppercase">
            {t("event.mileResult")}
          </Heading>
          <Heading fontSize={scaleSize(16)} textTransform="uppercase">
            {msToMinutesAndSeconds(resultInMs)}
          </Heading>
        </HStack>
        <HStack justifyContent="space-between" space="lg">
          <Heading fontSize={scaleSize(16)} textTransform="uppercase">
            {t("common.rank")}
          </Heading>
          <Heading fontSize={scaleSize(16)} textTransform="uppercase">
            {runner.rank}
          </Heading>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default MilerCard;
