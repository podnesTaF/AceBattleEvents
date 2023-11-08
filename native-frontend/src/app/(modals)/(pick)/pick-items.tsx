import PickAthletesList from "@Components/athletes/PickAthletesList";
import { Heading, VStack } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { usePathname } from "expo-router/src/hooks";
import React from "react";

const PickItemsModal = () => {
  const pathname = usePathname();
  const params = useLocalSearchParams<{ name?: string; multiple?: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: (props) => (
            <Heading size="xl" {...props}>
              Pick {params.name}
            </Heading>
          ),
        }}
      />
      <VStack p={"$4"}>
        <PickAthletesList />
      </VStack>
    </>
  );
};

export default PickItemsModal;
