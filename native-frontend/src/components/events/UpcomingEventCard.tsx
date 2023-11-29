import { StyleSheet } from "react-native";

import { Box, HStack, Heading } from "@gluestack-ui/themed";
import { IFutureEvent } from "@lib/models";
import { scaleSize } from "@lib/utils";
import { Image } from "expo-image";
import React from "react";

const UpcomingEventCard = ({ event }: { event: IFutureEvent }) => {
  return (
    <HStack rounded={"$lg"} mb={scaleSize(46)}>
      <Box width={"100%"} height={200}>
        <Box
          overflow="hidden"
          borderTopLeftRadius={100}
          softShadow="1"
          position="absolute"
          width={"100%"}
          height="100%"
          left={0}
          top={0}
        >
          <Image
            source={
              event.introImage
                ? { uri: event.introImage?.mediaUrl }
                : require("@Assets/images/event-template.png")
            }
            style={{
              height: "100%",
              width: "100%",
            }}
            contentFit="cover"
            alt="event image"
          />
          <Image
            source={require("@Assets/images/abm-logo-black.png")}
            style={{
              height: 60,
              width: 65,
              position: "absolute",
              top: 8,
              right: 8,
            }}
            contentFit="contain"
            alt="abm image"
          />
        </Box>
        <Box
          width={"$full"}
          bg="$red500"
          px={"$5"}
          pb={"$8"}
          position="absolute"
          bottom={0}
          left={0}
          borderColor="$white"
          borderTopLeftRadius={80}
          borderTopRightRadius={80}
          borderWidth={2}
          borderBottomWidth={0}
        >
          <Heading
            px={"$8"}
            color={"$white"}
            fontSize={scaleSize(18)}
            textTransform="capitalize"
          >
            {event.title}
          </Heading>
          <Box
            bg="#1E1C1F"
            width={"$full"}
            px={"$5"}
            py={"$1"}
            position="absolute"
            bottom={"$0"}
            left={"$5"}
            borderColor="$white"
            borderTopLeftRadius={50}
            borderTopRightRadius={50}
            borderWidth={2}
            borderBottomWidth={0}
          >
            <Heading textAlign="right" size={"md"} color={"$white"}>
              {event.season}
            </Heading>
          </Box>
        </Box>
      </Box>
      <Box
        width={"$full"}
        position="absolute"
        zIndex={-4}
        height={200}
        right={-12}
        bottom={scaleSize(-40)}
        bg="$white"
        softShadow="1"
        borderBottomRightRadius={100}
        justifyContent="flex-end"
      >
        <Heading
          fontSize={scaleSize(16)}
          fontWeight="bold"
          textAlign="left"
          p={"$2"}
        >
          Comming soon...
        </Heading>
      </Box>
    </HStack>
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
