import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import SmallNewsCard from "@Components/news/SmallNewsCard";
import TextContent from "@Components/news/TextContent";
import { Box, Heading, Image, ScrollView, VStack } from "@gluestack-ui/themed";
import { useGetArticleQuery } from "@lib/services";
import { formatDate } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const ArticlePage = () => {
  const { newsId } = useLocalSearchParams<{ newsId: string }>();
  const { data: news, isLoading, error } = useGetArticleQuery(newsId);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          title: "",
          headerTitle: ({ tintColor }) => (
            <HeaderSubtitledTitle title={"News"} tintColor={tintColor} />
          ),
        }}
      />
      <ScrollView>
        <WithLoading isLoading={isLoading}>
          <Box mt={"$5"} m={"$4"}>
            <Heading size={"lg"}>{news?.title}</Heading>
            <Heading size={"sm"}>{formatDate(news?.createdAt)}</Heading>
          </Box>
          <Box px={"$3"}>
            <Container vertical>
              <VStack py={"$4"}>
                {news?.contents.map((content, index) =>
                  content.text ? (
                    <TextContent key={content.id} text={content.text} />
                  ) : (
                    <Box
                      my={"$4"}
                      maxHeight={250}
                      key={content.id}
                      height={"auto"}
                    >
                      <Image
                        role="img"
                        size={"full"}
                        source={{ uri: content.media?.mediaUrl }}
                        alt={"article img"}
                      />
                    </Box>
                  )
                )}
              </VStack>
            </Container>
            {news?.relatedNews.newsPreviews.length ? (
              <Box mb={"$1/4"} mt={"$2"}>
                <Heading mb={"$4"} size={"lg"}>
                  Related News
                </Heading>
                <VStack space="sm">
                  {news?.relatedNews.newsPreviews.map((news, i, arr) => (
                    <SmallNewsCard
                      news={news}
                      key={news.id}
                      isLast={arr.length - 1 === i}
                    />
                  ))}
                </VStack>
              </Box>
            ) : null}
          </Box>
        </WithLoading>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(ArticlePage, "#fff9ff");
