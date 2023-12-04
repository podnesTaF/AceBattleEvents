import withWatermarkBg from "@Components/HOCs/withWatermark";
import HomeTabTitle from "@Components/HomeTabTitle";
import TopAthletesPodium from "@Components/athletes/TopAthletesPodium";
import PrimaryAuthCta from "@Components/auth/PrimaryAuthCta";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
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
import { selectUser } from "@lib/store";
import { mapFutureEvents, scaleSize } from "@lib/utils";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Page = () => {
  const user = useAppSelector(selectUser);
  const { data: eventsData, error, isLoading } = useFetchFutureEventsQuery();
  const {
    data: teamsData,
    isLoading: isTeamsLoading,
    error: teamsError,
  } = useGetAllTeamsQuery({
    limit: 4,
  });
  const width = Dimensions.get("window").width;
  const { data: newsData, isLoading: isNewsLoading } =
    useFetchNewsPreviewsQuery({ limit: 4 });

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event: any) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            scrollY.value > 0 ? -80 : -scrollY.value,
            { duration: 300 } // Adjust duration as needed
          ),
        },
      ],
      opacity: withTiming(scrollY.value > 0 ? 0 : 1, {
        duration: 300,
      }),
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerShown: true,
          header: (props) => (
            <Animated.View style={animatedHeaderStyle}>
              <Box
                overflow="hidden"
                bgColor="#1E1C1F"
                borderBottomRightRadius={12}
                borderBottomLeftRadius={12}
                w={width}
                px={"$4"}
                py={"$2"}
              >
                <HomeTabTitle user={user} />
              </Box>
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        <Box pt={user ? scaleSize(75) : scaleSize(20)}>
          {!user && (
            <Box my={"$4"}>
              <PrimaryAuthCta screen="home" />
            </Box>
          )}
          <VStack my={"$4"}>
            <Heading
              mx={"$3"}
              size={"md"}
              textTransform="uppercase"
              fontWeight="bold"
            >
              Upcoming Events
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
              Welcome to Ace Battle Mile
            </Heading>
            <VStack w={"$full"} overflow="hidden">
              {infoCards.map((inf, i) => (
                <StatCard
                  key={i}
                  title={inf.title}
                  subtitle={inf.subtitle}
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
          </Box>
          <TopAthletesPodium />
          <Box m={"$4"}>
            <Heading size={"xl"} mb={"$3"}>
              ABM TEAMS
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
              Latest News
            </Heading>
            <HorizontalListLayout
              itemWidth={0.9}
              ItemComponent={NewsCard}
              identifier={"news"}
              items={newsData?.newsPreviews}
            />
          </Box>
        </Box>
      </Animated.ScrollView>
    </>
  );
};

export default withWatermarkBg(Page, "#fff9ff");
