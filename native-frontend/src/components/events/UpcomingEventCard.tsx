import AbmButton from "@Components/common/buttons/AbmButton";
import { Box, HStack, Heading } from "@gluestack-ui/themed";
import { MappedFutureEvent } from "@lib/models";
import { formatDate, scaleSize } from "@lib/utils";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";

const UpcomingEventCard = ({ event }: { event: MappedFutureEvent }) => {
  const router = useRouter();

  return (
    <HStack rounded={"$lg"} mb={scaleSize(60)}>
      <Box width={"100%"} height={200}>
        <Box
          overflow="hidden"
          borderTopLeftRadius={100}
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
              {event.season ? event.season : formatDate(event.date, false)}
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
        bottom={-50}
        bg="$white"
        softShadow="1"
        borderBottomRightRadius={100}
        justifyContent="flex-end"
      >
        {event.infoAvailable ? (
          <Box py={"$1"} alignItems="center">
            <AbmButton
              title="View details"
              size="sm"
              onPress={() => router.push(`/(modals)/(event)/${event.id}`)}
            />
          </Box>
        ) : (
          <Heading fontSize={18} fontWeight="bold" textAlign="left" p={"$2"}>
            Comming Soon...
          </Heading>
        )}
      </Box>
    </HStack>
  );
};

export default UpcomingEventCard;
