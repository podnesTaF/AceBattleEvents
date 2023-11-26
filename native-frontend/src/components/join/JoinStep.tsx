import {
  Box,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

interface JoinStepProps {
  title: string;
  description: string;
  icon: JSX.Element;
  link?: any;
  isActive?: boolean;
  isFinished?: boolean;
  isLast?: boolean;
}

const JoinStep = ({
  title,
  description,
  icon,
  link,
  isActive,
  isFinished,
  isLast,
}: JoinStepProps): JSX.Element => {
  const router = useRouter();

  const bgColor = isFinished
    ? "#42E33480"
    : isActive
    ? "#12BAF180"
    : "$coolGray300";

  const handleRoute = () => {
    if (isActive && link) {
      router.push(link);
    }
  };

  return (
    <Pressable onPress={handleRoute}>
      {({ pressed }: { pressed: boolean }) => (
        <HStack space="lg" w={"$full"}>
          <VStack alignItems="center">
            <Center
              softShadow={pressed ? "1" : undefined}
              borderWidth={2}
              borderColor={bgColor}
              rounded={"$full"}
              h={"$16"}
              w={"$16"}
              p={"$1"}
              bg={"$white"}
              mb={"$2"}
            >
              <Center
                bg={bgColor}
                rounded={"$full"}
                height={"$full"}
                width={"$full"}
              >
                {icon}
              </Center>
            </Center>
            {isLast ? null : <Box w={"$1"} h={"$16"} bg={bgColor} mb={"$2"} />}
          </VStack>
          <VStack flex={1}>
            <Heading size={"xl"}>{title}</Heading>
            <Text color={"$coolGray400"}>{description}</Text>
          </VStack>
        </HStack>
      )}
    </Pressable>
  );
};

export default JoinStep;
