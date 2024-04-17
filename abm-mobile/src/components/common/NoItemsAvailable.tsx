import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import AbmButton from "./buttons/AbmButton";

type NoItemsAvailableProps = {
  title: string;
  text?: string;
  height?: any;
  link?: any;
  linkButtonText?: string;
};

const NoItemsAvailable = ({
  title,
  text,
  height,
  link,
  linkButtonText,
}: NoItemsAvailableProps): JSX.Element => {
  const router = useRouter();
  return (
    <VStack
      w={"$full"}
      height={height || "auto"}
      py={"$4"}
      alignItems="center"
      justifyContent="space-between"
      space={"md"}
    >
      <VStack alignItems="center" space={"md"}>
        <Heading size="lg" color="$coolGray400">
          {title}
        </Heading>
        {text && (
          <Text color="$coolGray400" size="lg" textAlign="center">
            {text}
          </Text>
        )}
      </VStack>
      {link && (
        <AbmButton
          title={linkButtonText || "link"}
          onPress={() => router.push(link)}
        />
      )}
    </VStack>
  );
};

export default NoItemsAvailable;
