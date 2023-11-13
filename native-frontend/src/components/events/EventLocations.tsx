import Container from "@Components/common/Container";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { IEvent } from "@lib/models";
import { formatDate, transformAddress } from "@lib/utils";
import React from "react";
import EventMap from "./EventMap";

interface Props {
  event: IEvent;
}

const EventLocations: React.FC<Props> = ({ event }) => {
  return (
    <VStack>
      <EventMap eventLocation={event.location} height={250} />
      <Container>
        <VStack p={"$4"} space="md">
          <VStack>
            <Heading size={"sm"} color={"$coolGray300"}>
              Stadium
            </Heading>
            <Text>{event.location.address}</Text>
          </VStack>
          <VStack>
            <Heading size={"sm"} color={"$coolGray300"}>
              Address
            </Heading>
            <Text>{transformAddress(event.location)}</Text>
          </VStack>
          <VStack>
            <Heading size={"sm"} color={"$coolGray300"}>
              Date and Time
            </Heading>
            <Text>{formatDate(event.startDateTime)}</Text>
          </VStack>
        </VStack>
      </Container>
    </VStack>
  );
};

export default EventLocations;
