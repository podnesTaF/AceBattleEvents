import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import YoutubeCard from "@Components/common/YoutubeCard";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import NewsCard from "@Components/news/NewsCard";
import NewsTag from "@Components/news/NewsTag";
import SmallNewsCard from "@Components/news/SmallNewsCard";
import { Box, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { IHashtag, NewsPreview } from "@lib/models";
import { useFetchNewsPreviewsQuery, useFetchTagsQuery } from "@lib/services";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

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

  const { t } = useTranslation();

  const {
    data: newsData,
    isLoading: isNewsLoading,
    error,
  } = useFetchNewsPreviewsQuery({
    tags: selectedTags.length ? selectedTags : undefined,
  });
  const { data: latestNews, isLoading: isAnouncementsLoading } =
    useFetchNewsPreviewsQuery({ limit: 4 });

  const { data: tags, isLoading: isTagsLoading } = useFetchTagsQuery();

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
          {t("newsScreen.latestNews")}
        </Heading>
        <SkeletonLoader<NewsPreview[]>
          data={latestNews?.newsPreviews}
          isLoading={isNewsLoading}
          height={200}
        >
          {(data) => (
            <HorizontalListLayout
              itemWidth={0.9}
              ItemComponent={NewsCard}
              identifier={"news"}
              items={data}
            />
          )}
        </SkeletonLoader>
      </VStack>
      <VStack my={"$4"} space={"lg"}>
        <Heading mx={"$4"} size={"lg"}>
          {t("newsScreen.videos")}
        </Heading>
        <HorizontalListLayout
          itemWidth={0.9}
          ItemComponent={YoutubeCard}
          identifier={"video"}
          items={videoItems}
        />
      </VStack>
      <VStack mb={"$4"} space="lg">
        <VStack space={"sm"} my={"$4"}>
          <Heading
            mx={"$4"}
            py={"$1"}
            size="lg"
            borderBottomWidth={2}
            borderColor="#ff0000"
            w={"auto"}
          >
            {t("newsScreen.allArticles")}
          </Heading>
          <SkeletonLoader<IHashtag[]>
            data={tags}
            isLoading={isTagsLoading}
            height={50}
          >
            {(data) => (
              <FlatList
                data={data}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                }}
                ItemSeparatorComponent={() => <Box w={"$4"} />}
                renderItem={({ item }) => (
                  <NewsTag
                    title={item.name}
                    onClick={onHandleTag}
                    action={
                      selectedTags.includes(item.name) ? "success" : "error"
                    }
                    variant={"outline"}
                  />
                )}
                keyExtractor={(item) => item.id + ""}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
              />
            )}
          </SkeletonLoader>
        </VStack>
        <Box px={"$4"}>
          <SkeletonLoader<NewsPreview[]>
            data={newsData?.newsPreviews}
            isLoading={isNewsLoading}
            error={error}
          >
            {(data) => (
              <VStack space="md">
                <FlatList
                  data={data}
                  renderItem={({ item, index }) => (
                    <SmallNewsCard
                      news={item}
                      isLast={index === data.length - 1}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </VStack>
            )}
          </SkeletonLoader>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default NewsScreen;
