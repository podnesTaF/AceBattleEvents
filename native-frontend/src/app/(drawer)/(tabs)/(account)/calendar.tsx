import WithLoading from "@Components/HOCs/withLoading";
import LogoTitle from "@Components/LogoTitle";
import CompetitionsTab from "@Components/athletes/tabs/CompetitionsTab";
import BgWatermark from "@Components/common/BgWatermark";
import InfoTemplate from "@Components/common/InfoTemplate";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import SpectatorRegistrationCard from "@Components/user/SpectatorRegistrationCard";
import { events, teams } from "@Constants/dummy-data";
import { Heading, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { useFetchSpectatorRegistrationsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { Stack } from "expo-router";
import React from "react";

const CalendarScreen = () => {
  const user = useAppSelector(selectUser);

  const { data: registrations, isLoading } =
    useFetchSpectatorRegistrationsQuery();

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
        {user?.role === "spectator" && (
          <WithLoading isLoading={!registrations || isLoading}>
            {registrations?.length ? (
              registrations.map((reg) => (
                <SpectatorRegistrationCard key={reg.id} registration={reg} />
              ))
            ) : (
              <InfoTemplate
                title="No registrations found"
                text="You don't have any registrations yet"
              />
            )}
          </WithLoading>
        )}
        {user?.role === "manager" && (
          <TeamRegistrationCard
            event={events[0] as any}
            team={teams[0] as any}
          />
        )}
        {user?.runner && <CompetitionsTab runnerId={user.runner.id} />}
      </VStack>
    </BgWatermark>
  );
};

export default CalendarScreen;
