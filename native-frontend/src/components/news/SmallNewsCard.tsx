import { HStack, Heading, Image, VStack } from "@gluestack-ui/themed";
import { NewsPreview } from "@lib/models";
import { cutString } from "@lib/utils";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

const SmallNewsCard = ({
  news,
  isLast,
}: {
  news: NewsPreview;
  isLast: boolean;
}): JSX.Element => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/(modals)/(news)/${news.id}`)}>
      {({ pressed }: { pressed: boolean }) => (
        <HStack
          opacity={pressed ? 0.8 : 1}
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
              size={"md"}
              rounded={"$md"}
            />
          )}
          <VStack space={"md"} flex={1}>
            <Heading size={"sm"}>{cutString(news.title, 100)}</Heading>
          </VStack>
        </HStack>
      )}
    </Pressable>
  );
};

export default SmallNewsCard;
