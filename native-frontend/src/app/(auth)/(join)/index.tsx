import JoinStep from "@Components/join/JoinStep";
import { Box, Heading, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { getMembershipSteps, scaleSize } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";

const join = () => {
  const user = useAppSelector(selectUser);
  const height = Dimensions.get("window").height;
  const steps = getMembershipSteps(user);

  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "black",
          headerTitle: ({ tintColor }) => (
            <Box justifyContent="center" my={"$2"}>
              <Heading style={{ color: tintColor }}>Join Us</Heading>
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

          <Box m={"auto"} maxWidth={scaleSize(350)} px={"$2"}>
            <Text color={"$coolGray400"}>
              *To become a runner, coach and/or manager, you have to create a
              user account first.
            </Text>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
};

export default join;
