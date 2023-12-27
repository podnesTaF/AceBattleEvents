import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import Tabs from "@Components/common/Tabs";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import EventLocations from "@Components/events/EventLocations";
import EventRegistrationSection from "@Components/events/EventRegistrationSection";
import TextContent from "@Components/news/TextContent";
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
import React, { useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["Participants", "Schedule", "Results"];

const EventScreen = () => {
  const { eventId } = useLocalSearchParams();
  const { data: eventInfo, isLoading, error } = useGetEventInfoQuery(+eventId);
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const scrollY = useRef(new Animated.Value(0)).current;

  const viewRef = useRef();

  const onChangeTab = (tabIndex: number) => {
    if (!eventInfo) return;
    if (tabs[tabIndex] === "Participants") {
      router.push({
        pathname: "/participants",
        params: { eventId, name: eventInfo.title },
      });
    } else if (tabs[tabIndex] === "Schedule") {
      router.push({ pathname: "/timetable", params: { eventId: eventId } });
    } else {
      router.push({ pathname: "/results", params: { eventId: eventId } });
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [100, 0], // Replace 'initialHeight' with the actual initial height of your content
    extrapolate: "clamp",
  });

  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -120],
    extrapolate: "clamp",
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <SkeletonLoader<EventInfo>
                data={eventInfo}
                isLoading={isLoading}
                error={error}
                color="#1f1f1f"
              >
                {(eventInfo) => (
                  <VStack width={"100%"} space="sm">
                    <Heading size="2xl" textAlign="center" color={"#fff"}>
                      {eventInfo.title}
                    </Heading>
                    <Animated.View
                      style={{
                        transform: [{ translateY }],
                        height: animatedHeight,
                        opacity: animatedOpacity,
                        overflow: "hidden", // To ensure content does not overflow during animation
                      }}
                    >
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
                        <Heading size="sm" color={"$white"}>
                          {eventInfo?.location?.city},{" "}
                          {eventInfo?.location?.country.name}
                        </Heading>
                      </HStack>
                      <HStack left={"$12"} alignItems="center" space={"sm"}>
                        <Icon as={Calendar} color={"$white"} />
                        <Heading size="sm" color={"$white"}>
                          {formatDate(eventInfo?.startDateTime)}
                        </Heading>
                      </HStack>
                    </Animated.View>
                    <Tabs
                      activeColor={"$white"}
                      items={tabs}
                      onChangeTab={onChangeTab}
                      passiveColor={"$coolGray100"}
                    />
                  </VStack>
                )}
              </SkeletonLoader>
            </SafeAreaView>
          ),
        }}
      />
      <Animated.ScrollView onScroll={handleScroll}>
        <SkeletonLoader<EventInfo>
          data={eventInfo}
          isLoading={isLoading}
          error={error}
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
              {eventInfo?.contents.map((content) => (
                <TextContent text={content.text} key={content.id} />
              ))}
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
      </Animated.ScrollView>
    </>
  );
};

export default withWatermarkBg(EventScreen);
