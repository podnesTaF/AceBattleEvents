import JoinStep from "@Components/join/JoinStep";
import { Box, Heading, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { getMembershipSteps, scaleSize } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";

const Join = () => {
  const user = useAppSelector(selectUser);
  const height = Dimensions.get("window").height;
  const steps = getMembershipSteps(user);
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "black",
          headerTitle: ({ tintColor }) => (
            <Box justifyContent="center" my={"$2"}>
              <Heading style={{ color: tintColor }}>{t("auth.joinUs")}</Heading>
            </Box>
          ),
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <ScrollView>
        <VStack
          alignItems="center"
          justifyContent="space-between"
          width={"$full"}
          flex={1}
          w={"$full"}
          py={"$2"}
          mt={"$20"}
        >
          <Box maxWidth={scaleSize(350)}>
            {steps.map((step, i, arr) => (
              <JoinStep key={i} {...step} isLast={i === arr.length - 1} />
            ))}
          </Box>

          <Box maxWidth={scaleSize(350)} px={"$2"} my={"$4"}>
            <Text color={"$coolGray400"}>
              *{t("steps.toBecomeCoachOrManager")}
            </Text>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Join;
