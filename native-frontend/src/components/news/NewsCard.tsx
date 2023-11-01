import React from "react";
import { Box, HStack, Text, Image, VStack } from "@gluestack-ui/themed";
import { getTimeAgo } from "@Utils/date-formatters";
import { Link } from "expo-router";

interface NewsCardProps {
  news: any;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <VStack rounded={"$md"} bg={"$white"} softShadow="4" overflow="hidden">
      <Box flex={2} height={"$32"} width={"$full"} position="relative" alignItems="stretch">
        <Image
          role={"img"}
          source={{ uri: news.smallImageUrl }}
          alt={"news preview"}
          size="full"
        />
      </Box>
      <Box px={"$3"} py={"$2"} flex={1} >
        <Text minHeight={40} textTransform="uppercase" fontWeight="600" size={"md"} mb={"$2"}>
          {news.title.length > 80 ? news.title.slice(0, 77) + '...' : news.title}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
            <Text color={"$coolGray400"} fontWeight="600">
                {getTimeAgo(news.createdAt)}
            </Text>
            <Link href={"/(drawer)/(tabs)/home"}>
               <Text color={'$red500'} fontWeight="600">
               read article
               </Text>
            </Link>
        </HStack>
      </Box>
    </VStack>
  );
};

export default NewsCard;
