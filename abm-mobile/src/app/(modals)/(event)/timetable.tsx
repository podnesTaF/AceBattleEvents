import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import InfoTemplate from "@Components/common/InfoTemplate";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import RaceCard from "@Components/race/RaceCard";
import { Box, Heading, VStack } from "@gluestack-ui/themed";
import { RaceWithCheckIn } from "@lib/models";
import { useGetRacesByEventQuery } from "@lib/races/services/raceService";
import { getNamedDate, getPaddingForPlatform } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

const Timetable = () => {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  const { t } = useTranslation();
  const { data: races, isLoading, error } = useGetRacesByEventQuery(eventId);
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          header: (props) => (
            <SafeAreaView
              style={{
                backgroundColor: "#1C1E1F",
                paddingTop: getPaddingForPlatform(),
              }}
            >
              <VStack space={"md"} alignItems="center" w={"$full"} pb={"$3"}>
                <HeaderSubtitledTitle
                  title={t("event.timetable")}
                  tintColor={"#fff"}
                />
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <VStack>
        <Heading size={"sm"} textAlign="center" my={"$2"}>
          {races?.[0]?.event.startDateTime &&
            getNamedDate(races[0].event.startDateTime)}
        </Heading>
        <VStack>
          <Heading mx={"$4"} size={"lg"} py={"$1"}>
            {t("event.races")}
          </Heading>
          <SkeletonLoader<RaceWithCheckIn[]>
            data={races}
            isLoading={isLoading}
            error={error}
          >
            {(data) =>
              data.length ? (
                <Container>
                  {data.map((race, i) => (
                    <RaceCard
                      key={race.id}
                      race={race}
                      registrationAvailable={race.availableForCheckIn}
                      isLast={i === data.length - 1}
                    />
                  ))}
                </Container>
              ) : (
                <Box mx={"$4"}>
                  <InfoTemplate
                    variant="outline"
                    title={t("event.noRacesYet")}
                    text={t("event.racesAvailableSoon")}
                  />
                </Box>
              )
            }
          </SkeletonLoader>
        </VStack>
      </VStack>
    </>
  );
};

export default withWatermarkBg(Timetable);
