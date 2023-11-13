import Tabs from "@Components/common/Tabs";
import CustomSelect from "@Components/custom/CustomSelect";
import { Box, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React, { useState } from "react";

const tabs = ["Teams", "Athletes"];

const filters = {
  category: [
    {
      label: "Men's",
      value: "male",
    },
    {
      label: "Women's",
      value: "female",
    },
  ],
};

const participants = () => {
  const [activeTab, setActiveTab] = useState(0);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <VStack space={"md"} alignItems="center" w={"$full"} left={"-$16"}>
              <VStack alignItems="center">
                <Heading size="lg" color={tintColor}>
                  Participants
                </Heading>
                <Heading size="xs" color={tintColor}>
                  Brussels Mile
                </Heading>
              </VStack>
              <Tabs
                activeColor={"#ff0000"}
                activeIndex={activeTab}
                items={tabs}
                onChangeTab={onChangeTab}
              />
            </VStack>
          ),
        }}
      />
      <Box pt={"$4"} alignItems="center">
        <Box
          w={"$80"}
          rounded={"$lg"}
          borderColor="$coolGray400"
          borderWidth={1}
        >
          <HStack px={"$3"} py={"$1"} space="lg" alignItems="center">
            <Heading color="$coolGray400" flex={1} size={"sm"}>
              Category
            </Heading>
            <Box flex={2}>
              <CustomSelect
                onChange={(value) => console.log(value)}
                items={filters.category}
                defaultPlaceholder="All"
              />
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default participants;
