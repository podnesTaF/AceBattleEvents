import withWatermarkBg from "@Components/HOCs/withWatermark";
import HomeTabTitle from "@Components/HomeTabTitle";
import TopAthletesPodium from "@Components/athletes/TopAthletesPodium";
import PrimaryAuthCta from "@Components/auth/PrimaryAuthCta";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import AbmButton from "@Components/common/buttons/AbmButton";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import StatCard from "@Components/custom/StatCard";
import UpcomingEventCard from "@Components/events/UpcomingEventCard";
import NewsCard from "@Components/news/NewsCard";
import TeamLogoCard from "@Components/teams/TeamLogoCard";
import { infoCards } from "@Constants/info-contents";
import { Box, Heading, VStack, View } from "@gluestack-ui/themed";
import { useFetchFutureEventsQuery } from "@lib/events/services/futureEventsService";
import { useAppSelector } from "@lib/hooks";
import { ITeam } from "@lib/models";
import { useFetchNewsPreviewsQuery, useGetAllTeamsQuery } from "@lib/services";
import { selectIsAuth, selectUserState } from "@lib/store";
import { mapFutureEvents, scaleSize } from "@lib/utils";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";

const Page = () => {
  const { t } = useTranslation();
  const userState = useAppSelector(selectUserState);
  const isAuthed = useAppSelector(selectIsAuth);
  const { data: eventsData, error, isLoading } = useFetchFutureEventsQuery();
  const {
    data: teamsData,
    isLoading: isTeamsLoading,
    error: teamsError,
  } = useGetAllTeamsQuery({
    limit: 4,
  });
  const { data: newsData, isLoading: isNewsLoading } =
    useFetchNewsPreviewsQuery({ limit: 4 });

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <ScrollView>
        <Box my={"$4"}>
          <SkeletonLoader<any>
            data={userState}
            isLoading={userState.loading}
            error={userState.error}
          >
            {(data) =>
              userState.data ? (
                <Box
                  borderTopLeftRadius={100}
                  borderBottomLeftRadius={200}
                  w={"$full"}
                  bg={"#ff0000"}
                  pl={scaleSize(40)}
                  pb={scaleSize(24)}
                >
                  <Heading
                    py={scaleSize(6)}
                    color={"$white"}
                    textAlign="center"
                    size={"lg"}
                  >
                    {t("mainPage.welcome")}
                  </Heading>
                  <Box
                    overflow="hidden"
                    borderTopLeftRadius={100}
                    borderBottomLeftRadius={200}
                    bg={"$white"}
                    justifyContent="center"
                    flex={1}
                  >
                    <HomeTabTitle user={userState.data} />
                  </Box>
                </Box>
              ) : (
                <Box my={"$4"}>
                  <PrimaryAuthCta screen="home" />
                </Box>
              )
            }
          </SkeletonLoader>
          <VStack my={"$4"}>
            <Heading
              mx={"$3"}
              size={"md"}
              textTransform="uppercase"
              fontWeight="bold"
            >
              {t("mainPage.upcomingEvents")}
            </Heading>
            <HorizontalListLayout
              error={error}
              identifier="event"
              items={mapFutureEvents(eventsData)}
              ItemComponent={UpcomingEventCard}
              isLoading={isLoading}
            />
          </VStack>
          <Box mt={"$2"} mb={"$6"}>
            <Heading mb={"$4"} size={"xl"} textAlign="center">
              {t("mainPage.exploreConcepts")}
            </Heading>
            <VStack w={"$full"} overflow="hidden">
              {infoCards.map((inf, i) => (
                <StatCard
                  key={i}
                  title={t(`mainPage.infoCards.card${i + 1}.title`, inf.title)}
                  subtitle={t(
                    `mainPage.infoCards.card${i + 1}.subtitle`,
                    inf.subtitle
                  )}
                  dark={inf.dark}
                  bg={inf.bg}
                  radius={inf.radius}
                />
              ))}
              <Box
                position="absolute"
                right={0}
                bottom={0}
                w={"$1/3"}
                h={"$full"}
              >
                <Image
                  style={{
                    width: "180%",
                    height: "180%",
                  }}
                  source={require("@Assets/images/abm-stadium.png")}
                  alt={"stadium"}
                  contentFit="cover"
                  contentPosition={"top left"}
                />
              </Box>
            </VStack>
            <Box alignItems="center" mt={"$4"}>
              <AbmButton
                onPress={() => router.push("/concept")}
                title={t("mainPage.abmConcept")}
              />
            </Box>
          </Box>
          <TopAthletesPodium />
          <Box m={"$4"}>
            <Heading size={"xl"} mb={"$3"}>
              {t("mainPage.abmTeams")}
            </Heading>
            <SkeletonLoader<ITeam[]>
              height={300}
              data={teamsData?.teams}
              isLoading={isTeamsLoading}
              error={teamsError}
            >
              {(data) => (
                <View
                  flexDirection="row"
                  flexWrap="wrap"
                  justifyContent="space-around"
                  gap={"$5"}
                >
                  {data.map((team) => (
                    <Box key={team.id} width={"$2/5"}>
                      <TeamLogoCard team={team} />
                    </Box>
                  ))}
                </View>
              )}
            </SkeletonLoader>
          </Box>
          <Box my="$6">
            <Heading px={"$4"} size="xl">
              {t("mainPage.latestNews")}
            </Heading>
            <HorizontalListLayout
              itemWidth={0.9}
              ItemComponent={NewsCard}
              identifier={"news"}
              items={newsData?.newsPreviews}
            />
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(Page, "#fff9ff");
