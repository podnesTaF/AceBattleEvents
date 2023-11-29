import WithLoading from "@Components/HOCs/withLoading";
import Container from "@Components/common/Container";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import YoutubeCard from "@Components/common/YoutubeCard";
import NewsCard from "@Components/news/NewsCard";
import NewsTag from "@Components/news/NewsTag";
import SmallNewsCard from "@Components/news/SmallNewsCard";
import { Box, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { useFetchNewsPreviewsQuery } from "@lib/services";
import React, { useState } from "react";
import { FlatList } from "react-native";

const tags = ["Competitions", "Interviews", "Events", "Races", "Players"];
const videoItems = [
  {
    id: 1,
    videoId: "WSUfPBJf_P4",
    title: "What's Battle Mile Structure and Rules",
  },
  {
    id: 2,
    videoId: "RRs8Z7GQmdk",
    title: "What's Battle Mile? Structure and Rules.",
  },
  {
    id: 3,
    videoId: "kehD79rNiyU",
    title: "Signing of the Memorandum between Battle Mile and Sport for All",
  },
];

const NewsScreen = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: newsData, isLoading: isNewsLoading } =
    useFetchNewsPreviewsQuery({ limit: 10 });

  const onHandleTag = (name: string) => {
    if (selectedTags.includes(name)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== name));
    } else {
      setSelectedTags([...selectedTags, name]);
    }
  };

  return (
    <ScrollView>
      <VStack space={"sm"} mt={"$4"}>
        <Heading mx={"$2"} size={"lg"}>
          Latest News
        </Heading>
        <WithLoading isLoading={isNewsLoading} loadingHeight="$48">
          <HorizontalListLayout
            itemWidth={0.9}
            ItemComponent={NewsCard}
            identifier={"news"}
            items={newsData?.newsPreviews?.slice(0, 3) || []}
          />
        </WithLoading>
      </VStack>
      <VStack my={"$4"} space={"lg"}>
        <Heading mx={"$4"} size={"lg"}>
          Videos
        </Heading>
        <HorizontalListLayout
          itemWidth={0.9}
          ItemComponent={YoutubeCard}
          identifier={"video"}
          items={videoItems}
        />
      </VStack>
      <VStack mb={"$8"} space="lg">
        <VStack space={"sm"} my={"$4"}>
          <Heading
            mx={"$4"}
            py={"$1"}
            size="lg"
            borderBottomWidth={2}
            borderColor="#ff0000"
            w={"auto"}
          >
            All Articles
          </Heading>
          <FlatList
            data={tags}
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            ItemSeparatorComponent={() => <Box w={"$4"} />}
            renderItem={({ item }) => (
              <NewsTag
                title={item}
                onClick={onHandleTag}
                action={selectedTags.includes(item) ? "success" : "error"}
                variant={"outline"}
              />
            )}
            keyExtractor={(item) => item}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
          />
        </VStack>

        <Box px={"$4"}>
          <Container vertical>
            <VStack space="md">
              {newsData?.newsPreviews.map((news, i, arr) => (
                <SmallNewsCard
                  key={news.id}
                  news={news as any}
                  isLast={i === arr.length - 1}
                />
              ))}
            </VStack>
          </Container>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default NewsScreen;
