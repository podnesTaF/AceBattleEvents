import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import SpectatorCalendar from "@Components/user/calendar/SpectatorCalendar";
import UserTeamsCalendar from "@Components/user/calendar/UserTeamsCalendar";
import { ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { Stack } from "expo-router";
import React from "react";

const CalendarScreen = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
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
      <ScrollView>
        <VStack my={"$8"}>
          {user &&
            (user.role === "spectator" ? (
              <SpectatorCalendar />
            ) : (
              <UserTeamsCalendar user={user} />
            ))}
        </VStack>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(CalendarScreen);
