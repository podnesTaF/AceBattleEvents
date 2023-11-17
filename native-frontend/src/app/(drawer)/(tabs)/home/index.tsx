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
  Image,
  ScrollView,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useFetchFutureEventsQuery } from "@lib/events/services/futureEventsService";
import { useFetchNewsPreviewsQuery, useGetAllTeamsQuery } from "@lib/services";
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
      <VStack mx={"$3"} mb={"$4"} space="lg">
        <Heading size={"lg"} textTransform="uppercase" fontWeight="bold">
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
      <Box mt={"$10"} mb={"$6"}>
        <HStack space={"sm"} alignItems="flex-start">
          <Box width={"$72"} height={520} position="relative" left={"-$40"}>
            <Image
              role="img"
              source={require("@Assets/images/stadium.png")}
              alt={"stadium"}
              width={280}
              height={500}
              objectFit="cover"
            />
          </Box>
          <VStack left={"-$40"} px={"$3"} width={"$4/6"}>
            <Heading size={"lg"} mb={"$4"} textAlign="center">
              Welcome to Ace Battle Mile
            </Heading>
            <VStack width={"$full"} space="xl" mb={"$4"}>
              {infoCards.map((item, i) => {
                return <StatCard key={i} {...item} />;
              })}
            </VStack>
          </VStack>
        </HStack>
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
        <WithLoading isLoading={isNewsLoading} loadingHeight="200px">
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
