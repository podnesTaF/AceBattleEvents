import withWatermarkBg from "@Components/HOCs/withWatermark";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import RunnerJoinForm from "@Components/join/RunnerJoinForm";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { getPaddingForPlatform } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

const RunnerJoin = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ paddingTop: getPaddingForPlatform() }}>
              <Box w={"$full"}>
                <HeaderSubtitledTitle
                  tintColor={"#000"}
                  subtitle="Ace Battle Mile"
                  title={t("runnerForm.runnerRegistration")}
                />
              </Box>
            </SafeAreaView>
          ),
        }}
      />
      <VStack
        h={"$full"}
        alignItems="center"
        py={"$4"}
        justifyContent="space-between"
      >
        <Box maxWidth={360} w={"$full"} py={"$4"} mx={"auto"}>
          <RunnerJoinForm />
        </Box>
        <Box mx={"auto"} maxWidth={350} px={"$2"}>
          <Text color={"$coolGray400"} textAlign="center">
            *{t("steps.toBecomeCoachOrManager")}
          </Text>
        </Box>
      </VStack>
    </>
  );
};

export default withWatermarkBg(RunnerJoin);
