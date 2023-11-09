import PickAthletesList from "@Components/athletes/PickAthletesList";
import PickCoachScreenContent from "@Components/athletes/screens/PickCoachScreenContent";
import { Heading, VStack } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { usePathname } from "expo-router/src/hooks";
import React from "react";

const PickItemsModal = () => {
  const pathname = usePathname();
  const params = useLocalSearchParams<{ name?: string; multiple?: string }>();
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
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
      {params.name === "players" && (
        <VStack p={"$4"}>
          <PickAthletesList />
        </VStack>
      )}
      {params.name === "coach" && <PickCoachScreenContent />}
    </>
  );
};

export default PickItemsModal;
