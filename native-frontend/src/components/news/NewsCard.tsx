import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { NewsPreview } from "@lib/models";
import { getTimeAgo } from "@lib/utils";
import { router } from "expo-router";
import React from "react";

interface NewsCardProps {
  news: NewsPreview;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <VStack flex={1} rounded={"$md"} bg={"$white"} overflow="hidden">
      <Box
        flex={2}
        height={"$32"}
        width={"$full"}
        position="relative"
        alignItems="stretch"
      >
        <Image
          role={"img"}
          source={{ uri: news.smallImageUrl }}
          alt={"news preview"}
          size="full"
        />
      </Box>
      <Pressable onPress={() => router.push(`/(modals)/(news)/${news.id}`)}>
        {({ pressed }: { pressed: boolean }) => (
          <Box px={"$3"} py={"$2"} flex={1} opacity={pressed ? 0.8 : 1}>
            <Text
              minHeight={40}
              textTransform="uppercase"
              fontWeight="600"
              size={"md"}
              mb={"$2"}
            >
              {news.title.length > 80
                ? news.title.slice(0, 77) + "..."
                : news.title}
            </Text>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={"$coolGray400"} fontWeight="600">
                {getTimeAgo(news.createdAt)}
              </Text>
            </HStack>
          </Box>
        )}
      </Pressable>
    </VStack>
  );
};

export default NewsCard;
