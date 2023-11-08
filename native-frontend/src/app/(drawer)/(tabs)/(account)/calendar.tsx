import LogoTitle from "@Components/LogoTitle";
import BgWatermark from "@Components/common/BgWatermark";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import SpectatorRegistrationCard from "@Components/user/SpectatorRegistrationCard";
import { events, teams, testUserSpectator } from "@Constants/dummy-data";
import { Heading, VStack } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React, { useState } from "react";

const CalendarScreen = () => {
  const [user, setUser] = useState(testUserSpectator);
  return (
    <BgWatermark>
      <Stack.Screen
        options={{
          title: "Calendar",
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <VStack space="md" my={"$4"} mx={"$2"}>
        <Heading>Upcoming Events</Heading>
        {user.role === "spectator" && (
          <SpectatorRegistrationCard
            user={user as any}
            event={events[0] as any}
          />
        )}
        {user.manager && (
          <TeamRegistrationCard
            event={events[0] as any}
            team={teams[0] as any}
          />
        )}
      </VStack>
    </BgWatermark>
  );
};

export default CalendarScreen;
