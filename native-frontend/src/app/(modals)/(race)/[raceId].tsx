import Container from "@Components/common/Container";
import Tabs from "@Components/common/Tabs";
import { races } from "@Constants/dummy-data";
import { Box, HStack, Heading, Icon, Text, VStack } from "@gluestack-ui/themed";
import { formatDate, getBattleName } from "@lib/utils";
import { Stack } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React, { useState } from "react";

const tabs = ["Overview", "Mile Runners", "Pacer-Joker"];

const RaceScreen = () => {
  const [activeTab, setActiveTab] = useState(0);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };
  const race = races[0];
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <VStack space={"md"} alignItems="center" w={"$full"} left={"-$16"}>
              <VStack alignItems="center" space="md" mb={"$4"}>
                <Heading size="xs" color={tintColor}>
                  {race.event.title}
                </Heading>
                <Heading size="lg" color={tintColor}>
                  {getBattleName(race)}
                </Heading>
                <Text color={tintColor}>{formatDate(race.startTime)}</Text>
              </VStack>
              <Tabs
                items={tabs}
                activeColor={"$white"}
                onChangeTab={onChangeTab}
                passiveColor={"$coolGray100"}
              />
            </VStack>
          ),
        }}
      />
      <Box my={"$4"}>
        <Container vertical>
          <VStack py={"$3"} px={"$2"} space="md">
            <Heading>Results are not ready</Heading>
            <HStack space="md" alignItems="center">
              <Icon as={InfoIcon} size="lg" />
              <Text>
                The race is in proccess.Wait until the race will be finished
              </Text>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default RaceScreen;
