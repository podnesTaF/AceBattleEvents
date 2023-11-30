import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import Tabs from "@Components/common/Tabs";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import EventLocations from "@Components/events/EventLocations";
import EventRegistrationSection from "@Components/events/EventRegistrationSection";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetEventInfoQuery } from "@lib/events/services";
import { useAppSelector } from "@lib/hooks";
import { EventInfo } from "@lib/models";
import { selectUser } from "@lib/store";
import { formatDate } from "@lib/utils";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const tabs = ["Participants", "Schedule", "Results"];

const EventScreen = () => {
  const { eventId } = useLocalSearchParams();
  const { data: eventInfo, isLoading } = useGetEventInfoQuery(+eventId);
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const onChangeTab = (tabIndex: number) => {
    if (tabs[tabIndex] === "Participants") {
      router.push("/participants");
    } else if (tabs[tabIndex] === "Schedule") {
      router.push("/timetable");
    } else {
      router.push({ pathname: "/results", params: { eventId: eventId } });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => {
            return (
              <SkeletonLoader<EventInfo>
                data={eventInfo}
                wrapperStyle={{
                  height: "$24",
                  width: "$full",
                }}
              >
                {(eventInfo) => (
                  <VStack width={"100%"} left={"-$16"} space="md">
                    <Heading
                      size="xl"
                      textAlign="center"
                      color={tintColor}
                      top={"$2"}
                    >
                      {eventInfo.title}
                    </Heading>
                    <VStack>
                      <HStack space="sm">
                        {eventInfo.location?.country.flagIconUrl && (
                          <Image
                            role="img"
                            alt={"country flag"}
                            source={{
                              uri: eventInfo.location.country.flagIconUrl,
                            }}
                            size="xs"
                          />
                        )}
                        <Heading size="sm" color={tintColor}>
                          {eventInfo?.location?.city},{" "}
                          {eventInfo?.location?.country.name}
                        </Heading>
                      </HStack>
                      <HStack left={"$12"} alignItems="center" space={"sm"}>
                        <Icon as={Calendar} color={tintColor} />
                        <Heading size="sm" color={tintColor}>
                          {formatDate(eventInfo?.startDateTime)}
                        </Heading>
                      </HStack>
                    </VStack>
                    <Tabs
                      activeColor={"$white"}
                      items={tabs}
                      onChangeTab={onChangeTab}
                      passiveColor={"$coolGray100"}
                    />
                  </VStack>
                )}
              </SkeletonLoader>
            );
          },
        }}
      />
      <ScrollView>
        <SkeletonLoader<EventInfo>
          data={eventInfo}
          wrapperStyle={{
            height: 200,
            width: "$full",
          }}
        >
          {(event) => (
            <VStack mb={"$6"} w={"$full"}>
              <Image
                role="img"
                alt={"event"}
                source={{ uri: event.introImage?.mediaUrl }}
                size={"full"}
                height={200}
                objectFit="cover"
              />
              <Box
                position={"absolute"}
                top={0}
                left={0}
                width={"$full"}
                height="$full"
                bgColor={"rgba(0,0,0,0.2)"}
              ></Box>
            </VStack>
          )}
        </SkeletonLoader>
        <VStack space="md" mb={"$6"}>
          <Heading mx={"$4"} size={"xl"}>
            About the Event
          </Heading>
          <Container vertical>
            <Box py={"$4"}>
              <Text size={"md"}>
                Just a few years ago the Ace Battle Mile organizers set their
                sights on going international, and this autumn, they are taking
                confident steps to realize that goal. The European debut will
                take place on September 23rd in Brussels, where the first races
                of the ACE Battle Mile teams will unfold.
              </Text>
              <Heading size={"md"} my={"$2"}>
                Preliminary teams:
              </Heading>
              <HStack my={"$3"} space="lg">
                <VStack flex={1} space={"sm"}>
                  <Text textAlign="center">Professionals</Text>
                  <HStack justifyContent="space-between" space="md">
                    <Heading size={"sm"} flex={1} textAlign="center">
                      2 women's teams
                    </Heading>
                    <Heading size={"sm"} flex={1} textAlign="center">
                      2 men's teams
                    </Heading>
                  </HStack>
                  <Text size={"sm"} textAlign="center">
                    teams consist of professionals from different clubs and
                    countries
                  </Text>
                </VStack>
                <VStack flex={1} space={"sm"}>
                  <Text textAlign="center">Kids. u16</Text>
                  <HStack justifyContent="space-between" space="md">
                    <Heading size={"sm"} flex={1} textAlign="center">
                      2 mixed teams
                    </Heading>
                  </HStack>
                  <Text size={"sm"} textAlign="center">
                    Young athletes from local schools and youth running clubs
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Container>
        </VStack>
        <SkeletonLoader<EventInfo> data={eventInfo}>
          {(data) => (
            <VStack my={"$6"}>
              <EventRegistrationSection user={user} event={data} />
            </VStack>
          )}
        </SkeletonLoader>
        <VStack my={"$6"} space="lg">
          <Heading mx={"$4"} size={"lg"}>
            Location and Date
          </Heading>
          <SkeletonLoader<EventInfo> data={eventInfo}>
            {(data) => <EventLocations event={data} />}
          </SkeletonLoader>
        </VStack>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(EventScreen);
