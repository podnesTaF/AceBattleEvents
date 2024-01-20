import { logoWhite } from "@Constants/cloud-images";
import { Box, Center, Image, Text, VStack } from "@gluestack-ui/themed";
import { IRunner } from "@lib/models";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

interface AthletePodiumCardProps {
  runner?: IRunner;
}

const AthletePodiumCard: React.FC<AthletePodiumCardProps> = ({ runner }) => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!runner) return null;
  return (
    <Center
      alignSelf={
        runner.rank === 2
          ? "center"
          : runner.rank === 1
          ? "flex-start"
          : "flex-end"
      }
    >
      <Pressable
        onPress={() => router.push(`/(modals)/(profile)/${runner.user.id}`)}
      >
        {({ pressed }) => (
          <>
            <Box mb={"$1"} width={"$full"} opacity={pressed ? 0.8 : 1}>
              <Image
                role={"img"}
                source={{
                  uri: runner.user.image?.mediaUrl || logoWhite,
                }}
                alt={"avatar"}
                size={"lg"}
                height={80}
                objectFit="cover"
                borderTopLeftRadius={20}
                borderBottomRightRadius={20}
              />
            </Box>
            <VStack alignItems="center" maxWidth={"$32"}>
              <Text fontWeight="600" size="lg" color={"$white"}>
                {t("mainPage.runnerDetails.rank")} {runner.rank}
              </Text>
              <Text
                size="md"
                color="$coolGray300"
                textTransform="capitalize"
                textAlign="center"
              >
                {runner.user.name} {runner.user.surname}
              </Text>
            </VStack>
          </>
        )}
      </Pressable>
    </Center>
  );
};

export default AthletePodiumCard;
