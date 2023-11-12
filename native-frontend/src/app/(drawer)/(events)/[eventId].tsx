import Tabs from "@Components/common/Tabs";
import { events } from "@Constants/dummy-data";
import { HStack, Heading, Icon, Image, VStack } from "@gluestack-ui/themed";
import { formatDate } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const tabs = ["Participants", "Schedule", "Results"];

const EventScreen = () => {
  const { eventId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const event = events[0];
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => {
            return (
              <VStack
                alignItems="center"
                width={"100%"}
                space="md"
                left={"-$16"}
              >
                <Heading size="xl" color={tintColor}>
                  {event.title}
                </Heading>
                <VStack space={"sm"} mb={"$2"}>
                  <HStack space="sm">
                    {event.location.country.flagIconUrl && (
                      <Image
                        role="img"
                        alt={"country flag"}
                        source={{ uri: event.location.country.flagIconUrl }}
                        size="xs"
                      />
                    )}
                    <Heading size="sm" color={tintColor}>
                      {event.location.city}, {event.location.country.name}
                    </Heading>
                  </HStack>
                  <HStack>
                    <Icon as={Calendar} color={tintColor} />
                    <Heading color={tintColor}>
                      {formatDate(event.startDateTime)}
                    </Heading>
                  </HStack>
                </VStack>
                <Tabs
                  activeColor={"$white"}
                  items={tabs}
                  activeIndex={activeTab}
                  onChangeTab={(value) => setActiveTab(value)}
                />
              </VStack>
            );
          },
        }}
      />
      <ScrollView>
        <VStack>
          <Heading>About the event</Heading>
        </VStack>
      </ScrollView>
    </>
  );
};

export default EventScreen;
