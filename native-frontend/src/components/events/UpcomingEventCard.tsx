import { StyleSheet } from "react-native";

import { Box, HStack, Heading, Image, Pressable } from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";
import React from "react";

const UpcomingEventCard = () => {
  const router = useRouter();
  return (
    <Link href={`/(modals)/(event)/${1}`} asChild>
      <Pressable>
        {({ pressed }: { pressed: boolean }) => (
          <HStack
            opacity={pressed ? 0.9 : 1}
            position="relative"
            rounded={"$lg"}
          >
            <Box
              width={"100%"}
              rounded={"$lg"}
              height={200}
              position="relative"
            >
              <Image
                role="img"
                source={require("@Assets/images/brussels-mile.jpg")}
                position="absolute"
                size="full"
                height={200}
                left={0}
                top={0}
                rounded={"$lg"}
                alt="event image"
              />
              <Box
                width={"$full"}
                bg="black"
                px={"$3"}
                py={"$2"}
                position="absolute"
                bottom={0}
                left={0}
                flex={1}
                borderBottomRightRadius={"$lg"}
                borderBottomLeftRadius={"$lg"}
              >
                <Heading size={"xl"} color="$white" fontWeight="bold">
                  Mace of Brussels
                </Heading>
              </Box>
            </Box>
            <Box
              width={"$full"}
              position="absolute"
              zIndex={-1}
              height={200}
              right={-6}
              bottom={-42}
              bg="$coolGray200"
              rounded={"$lg"}
              justifyContent="flex-end"
            >
              <Heading size="lg" fontWeight="bold" textAlign="right" p={"$2"}>
                March 2024
              </Heading>
            </Box>
          </HStack>
        )}
      </Pressable>
    </Link>
  );
};

export default UpcomingEventCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  container: {
    width: "100%",
    paddingHorizontal: 16,
    position: "relative",
  },
  mainCard: {
    borderRadius: 10,
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  cardTitleBox: {
    backgroundColor: "#000000",
    padding: 12,
    borderBottomStartRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  shadowCard: {
    position: "absolute",
    bottom: 0,
    right: -5,
    borderRadius: 10,
    zIndex: -10,
    backgroundColor: "#f9f9f9",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
});
