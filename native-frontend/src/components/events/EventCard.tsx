import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { IEvent } from "@lib/models";
import { convertFlagIntoPng, formatDate } from "@lib/utils";
import { Link } from "expo-router";
import React from "react";

interface Props {
  event: IEvent;
  passed?: boolean;
  children?: React.ReactNode;
}

const EventCard: React.FC<Props> = ({ event, children, passed }) => {
  return (
    <Box
      p={"$3"}
      backgroundColor="$white"
      borderBottomColor="$red500"
      borderBottomWidth={4}
    >
      <Heading textAlign="center" size={"lg"} mb={"$4"}>
        {event.title}
      </Heading>
      <VStack space="md" width={"$full"}>
        <HStack justifyContent="space-between" space="md">
          <Text size={"md"}>Date</Text>
          <Heading size={"md"}>
            {formatDate(event.startDateTime, false)}
          </Heading>
        </HStack>
        <HStack justifyContent="space-between" space="md">
          <Text size={"md"}>Location</Text>
          <HStack alignItems="center" space="sm">
            {event.location.country?.flagIconUrl && (
              <Image
                role={"img"}
                alt={"flag"}
                source={{
                  uri: convertFlagIntoPng(event.location.country.flagIconUrl),
                }}
                size={"xs"}
                maxHeight={"$7"}
              />
            )}
            <Heading size={"md"}>{event.location.country.name}</Heading>
          </HStack>
        </HStack>
        {children}
        <HStack justifyContent="space-between" space="md">
          {passed ? (
            <>
              <Text size={"md"}>Results</Text>
              <Link
                href={{
                  pathname: `/(modals)/(event)/results`,
                  params: { eventId: event.id + "" },
                }}
                asChild
              >
                <Heading size={"md"} color={"$amber400"}>
                  event results
                </Heading>
              </Link>
            </>
          ) : (
            <>
              <Text size={"md"}>Details</Text>
              <Link href={`/(modals)/(event)/${event.id}`} asChild>
                <Heading size={"md"} color={"$amber400"}>
                  visit event page
                </Heading>
              </Link>
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default EventCard;
