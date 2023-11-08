import withWatermarkBg from "@Components/HOCs/withWatermark";
import AthletePodiumCard from "@Components/athletes/AthletePodiumCard";
import StatCard from "@Components/custom/StatCard";
import UpcomingEventCard from "@Components/events/UpcomingEventCard";
import NewsCard from "@Components/news/NewsCard";
import TeamLogoCard from "@Components/teams/TeamLogoCard";
import { newsPreviews, teams, users } from "@Constants/dummy-data";
import { infoCards } from "@Constants/info-contents";
import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Pressable,
  ScrollView,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <VStack mx={"$3"} mb={"$4"} space="lg">
        <Heading size={"lg"} textTransform="uppercase" fontWeight="bold">
          Upcoming Events
        </Heading>
        <UpcomingEventCard />
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
      <Box my={"$4"} p={"$3"} bg={"$coolGray900"}>
        <Heading size="lg" color="$white" mb={"$4"}>
          Top ABM Runners
        </Heading>
        <Center width={"$full"} mb={"$4"}>
          <HStack>
            <Pressable>
              {({ pressed }: { pressed: boolean }) => (
                <Box
                  bg={pressed ? "$red700" : "$red500"}
                  minWidth={"$24"}
                  borderBottomLeftRadius={16}
                  px={"$3"}
                  py={"$1"}
                >
                  <Heading size="xl" color="$white" textAlign="center">
                    Men
                  </Heading>
                </Box>
              )}
            </Pressable>
            <Pressable>
              {({ pressed }: { pressed: boolean }) => (
                <Box
                  bg={pressed ? "$coolGray700" : "$coolGray800"}
                  minWidth={"$24"}
                  borderTopRightRadius={16}
                  px={"$3"}
                  py={"$1"}
                >
                  <Heading size="xl" color="$white" textAlign="center">
                    Women
                  </Heading>
                </Box>
              )}
            </Pressable>
          </HStack>
        </Center>
        <Center mb={"$5"} px={"$4"}>
          <HStack space="lg" width={"$full"}>
            {[2, 1, 3].map((rank, i) => (
              <HStack key={rank} height={"$56"} flex={1}>
                <AthletePodiumCard
                  user={users.find((user) => user.runner.rank === rank)}
                />
              </HStack>
            ))}
          </HStack>
        </Center>
      </Box>
      <Box m={"$4"}>
        <Heading size={"xl"} mb={"$3"}>
          ABM TEAMS
        </Heading>
        <View
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
          gap={"$5"}
        >
          {teams.map((team) => (
            <Box key={team.id} width={"$2/5"}>
              <TeamLogoCard team={team} />
            </Box>
          ))}
        </View>
      </Box>
      <Box my="$6" px={"$4"}>
        <Heading size="xl">Latest News</Heading>
        <ScrollView horizontal={true}>
          <HStack space="xl">
            {newsPreviews.map((news) => (
              <Box key={news.id} maxWidth={380}>
                <NewsCard news={news} />
              </Box>
            ))}
          </HStack>
        </ScrollView>
      </Box>
    </ScrollView>
  );
};

export default withWatermarkBg(Page);
