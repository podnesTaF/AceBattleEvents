import Container from "@Components/common/Container";
import YoutubeCard from "@Components/common/YoutubeCard";
import NewsCard from "@Components/news/NewsCard";
import SmallNewsCard from "@Components/news/SmallNewsCard";
import { newsPreviews } from "@Constants/dummy-data";
import { Box, HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import React from "react";

const tags = ["Competitions", "Interviews", "Events", "Races", "Players"];
const videoItems = [
  {
    videoId: "WSUfPBJf_P4",
    title: "What's Battle Mile Structure and Rules",
  },
  {
    videoId: "RRs8Z7GQmdk",
    title: "What's Battle Mile? Structure and Rules.",
  },
  {
    videoId: "kehD79rNiyU",
    title: "Signing of the Memorandum between Battle Mile and Sport for All",
  },
];

const NewsScreen = () => {
  return (
    <ScrollView>
      <VStack space={"sm"} my={"$4"} mx={"$3"}>
        <Heading
          py={"$1"}
          size="xl"
          borderBottomWidth={2}
          borderColor="#ff0000"
          w={"auto"}
        >
          News
        </Heading>
        <ScrollView horizontal>
          <HStack space="md" alignItems="center">
            {tags.map((tag, i) => (
              <Box
                bg={"$primary200"}
                borderWidth={1}
                borderColor="$primary400"
                key={i}
                w={"$32"}
                alignItems="center"
                justifyContent="center"
                rounded={"$md"}
                py={"$2"}
              >
                <Heading size={"sm"}>{tag}</Heading>
              </Box>
            ))}
          </HStack>
        </ScrollView>
      </VStack>
      <VStack space={"md"}>
        <Heading mx={"$2"} size={"lg"}>
          Latest News
        </Heading>
        <ScrollView horizontal={true}>
          <HStack space="xl">
            {newsPreviews.slice(0, 3).map((news) => (
              <Box pl={"$4"} key={news.id} maxWidth={380}>
                <NewsCard news={news} />
              </Box>
            ))}
          </HStack>
        </ScrollView>
      </VStack>
      <VStack my={"$4"} space={"lg"}>
        <Heading mx={"$4"} size={"lg"}>
          Videos
        </Heading>
        <ScrollView horizontal={true}>
          <HStack space={"xl"}>
            {videoItems.map((video) => (
              <YoutubeCard
                key={video.videoId}
                videoId={video.videoId}
                title={video.title}
              />
            ))}
          </HStack>
        </ScrollView>
      </VStack>
      <VStack m={"$4"} space="lg">
        <Heading size={"lg"}>All Articles</Heading>
        <Container vertical>
          <VStack space="md">
            {newsPreviews.map((news, i) => (
              <SmallNewsCard
                key={news.id}
                news={news as any}
                isLast={i === newsPreviews.length - 1}
              />
            ))}
          </VStack>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default NewsScreen;
