import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import TopAthletesPodium from "@Components/athletes/TopAthletesPodium";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import StatCard from "@Components/custom/StatCard";
import UpcomingEventCard from "@Components/events/UpcomingEventCard";
import NewsCard from "@Components/news/NewsCard";
import TeamLogoCard from "@Components/teams/TeamLogoCard";
import { infoCards } from "@Constants/info-contents";
import {
  Box,
  HStack,
  Heading,
  ScrollView,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useFetchFutureEventsQuery } from "@lib/events/services/futureEventsService";
import { useFetchNewsPreviewsQuery, useGetAllTeamsQuery } from "@lib/services";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";

const Page = () => {
  const { data: futureEvents, error, isLoading } = useFetchFutureEventsQuery();
  const { data: teamsData, isLoading: isTeamsLoading } = useGetAllTeamsQuery({
    limit: 4,
  });
  const { data: newsData, isLoading: isNewsLoading } =
    useFetchNewsPreviewsQuery({ limit: 4 });
  const router = useRouter();

  return (
    <ScrollView>
      <VStack mx={"$3"} my={"$4"}>
        <Heading size={"md"} textTransform="uppercase" fontWeight="bold">
          Upcoming Events
        </Heading>
        <HorizontalListLayout
          identifier="event"
          items={futureEvents}
          ItemComponent={UpcomingEventCard}
          isLoading={isLoading}
          wrapperProps={{
            pb: "$12",
          }}
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
          <Box position="absolute" right={0} bottom={0} w={"$1/3"} h={"$full"}>
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
        <WithLoading isLoading={isTeamsLoading} loadingHeight="200px">
          <View
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-around"
            gap={"$5"}
          >
            {teamsData?.teams?.map((team) => (
              <Box key={team.id} width={"$2/5"}>
                <TeamLogoCard team={team} />
              </Box>
            ))}
          </View>
        </WithLoading>
      </Box>
      <Box my="$6" px={"$4"}>
        <Heading size="xl">Latest News</Heading>
        <WithLoading isLoading={isNewsLoading} loadingHeight="$48">
          <ScrollView horizontal={true}>
            <HStack space="xl">
              {newsData?.newsPreviews.map((news) => (
                <Box key={news.id} maxWidth={380}>
                  <NewsCard news={news} />
                </Box>
              ))}
            </HStack>
          </ScrollView>
        </WithLoading>
      </Box>
    </ScrollView>
  );
};

export default withWatermarkBg(Page);
