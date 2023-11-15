import { HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { NewsPreview } from "@lib/models";
import { Link } from "expo-router";
import React from "react";

const SmallNewsCard = ({
  news,
  isLast,
}: {
  news: NewsPreview;
  isLast: boolean;
}) => {
  return (
    <HStack
      space={"md"}
      py={"$1"}
      borderBottomWidth={isLast ? 0 : 2}
      borderColor={"$coolGray300"}
    >
      {news.mainImage && (
        <Image
          role="img"
          alt={"news image"}
          source={{ uri: news.mainImage?.mediaUrl }}
          size={"lg"}
          rounded={"$md"}
        />
      )}
      <VStack space={"md"} flex={1}>
        <Heading size={"sm"}>{news.title}</Heading>
        <HStack justifyContent="space-between" space="lg">
          <Heading size={"xs"} color="$coolGray400"></Heading>
          <Link href={`/(modals)/(news)/${news.id}`} asChild>
            <Heading size={"xs"} color="#ff0000">
              read article
            </Heading>
          </Link>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default SmallNewsCard;
