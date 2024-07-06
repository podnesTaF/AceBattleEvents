import withWatermarkBg from "@Components/HOCs/withWatermark";
import PickAthletesList from "@Components/athletes/PickAthletesList";
import PickCoachScreenContent from "@Components/athletes/screens/PickCoachScreenContent";
import PickCountryList from "@Components/countries/PickCountryList";
import PickManagersList from "@Components/join/PickManagersList";
import PickReceiversList from "@Components/notifications/PickReceiversList";
import PickTeam from "@Components/teams/PickTeam";
import { Ionicons } from "@expo/vector-icons";
import { Heading } from "@gluestack-ui/themed";
import { Stack, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

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
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerLeft: () => <></>,
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Heading size="xl" color={props.tintColor}>
              Pick {params.name}
            </Heading>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              hitSlop={40}
              onPress={onSave}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={32}
                color={"#fff"}
              />
            </TouchableOpacity>
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

export default withWatermarkBg(PickItemsModal, "#FFF9FF");
