import PickAthletesList from "@Components/athletes/PickAthletesList";
import PickCoachScreenContent from "@Components/athletes/screens/PickCoachScreenContent";
import PickCountryList from "@Components/countries/PickCountryList";
import PickManagersList from "@Components/join/PickManagersList";
import PickReceiversList from "@Components/notifications/PickReceiversList";
import PickTeam from "@Components/teams/PickTeam";
import { Button, ButtonText, Heading } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { usePathname } from "expo-router/src/hooks";
import React, { useState } from "react";

const PickItemsModal = () => {
  const pathname = usePathname();
  const params = useLocalSearchParams<{ name?: string; multiple?: string }>();
  const [save, setSave] = useState(false);

  const onSave = () => {
    setSave(true);
  };

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
          headerRight: () => (
            <Button onPress={onSave}>
              <ButtonText>Save</ButtonText>
            </Button>
          ),
        }}
      />
      {params.name === "players" && (
        <PickAthletesList save={save} setSave={setSave} />
      )}
      {params.name === "team" && <PickTeam save={save} setSave={setSave} />}
      {params.name === "coach" && (
        <PickCoachScreenContent save={save} setSave={setSave} />
      )}
      {params.name === "country" && (
        <PickCountryList save={save} setSave={setSave} />
      )}
      {params.name === "manager" && (
        <PickManagersList save={save} setSave={setSave} />
      )}
      {params.name === "receivers" && (
        <PickReceiversList save={save} setSave={setSave} />
      )}
    </>
  );
};

export default PickItemsModal;
