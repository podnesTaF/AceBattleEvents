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
  SectionList,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetEventInfoQuery } from "@lib/events/services";
import { useAppSelector, useTranslatedTabs } from "@lib/hooks";
import { EventInfo } from "@lib/models";
import { selectUser } from "@lib/store";
import { formatDate } from "@lib/utils";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Calendar } from "lucide-react-native";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {Animated, ScrollView} from "react-native";

const EventScreen = () => {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const headerHeight = useHeaderHeight();
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const { t } = useTranslation();

  const { data: eventInfo, isLoading, error } = useGetEventInfoQuery(+eventId!);
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const tabs = useTranslatedTabs([
    "event.participants",
    "event.schedule",
    "event.results",
  ]);

  const onChangeTab = (tabIndex: number) => {
    if (!eventInfo) return;
    if (tabIndex === 0) {
      router.push({
        pathname: "(modals)/(event)/participants",
        params: { eventId, name: eventInfo.title },
      });
    } else if (tabIndex === 1) {
      router.push({ pathname: "/timetable", params: { eventId: eventId } });
    } else {
      router.push({ pathname: "(modals)/(event)/results", params: { eventId: eventId } });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: eventInfo?.title,
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
      <SectionList
        keyExtractor={(i) => (i as any).title}
        sections={[{ data: [{ title: "Event Info" }] }]}
        contentInsetAdjustmentBehavior="automatic"
        renderSectionHeader={() => (
          <Box
              style={{ backgroundColor: "#1C1E1F"}}>
            <Tabs
              activeColor={"$white"}
              items={tabs}
              onChangeTab={onChangeTab}
              passiveColor={"$coolGray100"}
            />
          </Box>
        )}
        ListHeaderComponent={() => (
          <Box style={{ backgroundColor: "#1c1e1f" }}>
            <HStack space="sm">
              {eventInfo?.location?.country.flagIconUrl && (
                <Image
                  role="img"
                  alt={"country flag"}
                  source={{
                    uri: eventInfo?.location.country.flagIconUrl,
                  }}
                  size="xs"
                />
              )}
              <Heading size="sm" color={"$white"}>
                {eventInfo?.location?.city}, {eventInfo?.location?.country.name}
              </Heading>
            </HStack>
            <HStack left={"$12"} alignItems="center" space={"sm"}>
              <Icon as={Calendar} color={"$white"} />
              <Heading size="sm" color={"$white"}>
                {formatDate(eventInfo?.startDateTime)}
              </Heading>
            </HStack>
          </Box>
        )}
        renderItem={({ item }) => (
          <>
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
                {t("event.aboutTheEvent")}
              </Heading>
              <Container vertical>
                <Box py={"$4"}>
                  {eventInfo?.contents.map((content) => (
                    <TextContent text={content.text} key={content.id} />
                  ))}
                  <Heading size={"md"} my={"$2"}>
                    {t("event.preliminaryTeams")}
                  </Heading>
                  <HStack my={"$3"} space="lg">
                    <VStack flex={1} space={"sm"}>
                      <Text textAlign="center">
                        {" "}
                        {t("event.professionals")}
                      </Text>
                      <HStack justifyContent="space-between" space="md">
                        <Heading size={"sm"} flex={1} textAlign="center">
                          2 {t("event.womensTeams")}
                        </Heading>
                        <Heading size={"sm"} flex={1} textAlign="center">
                          2 {t("event.mensTeams")}
                        </Heading>
                      </HStack>
                      <Text size={"sm"} textAlign="center">
                        {t("event.teamsDescription")}
                      </Text>
                    </VStack>
                    <VStack flex={1} space={"sm"}>
                      <Text textAlign="center"> {t("event.kidsUnder16")}</Text>
                      <HStack justifyContent="space-between" space="md">
                        <Heading size={"sm"} flex={1} textAlign="center">
                          2 {t("event.mixedTeams")}
                        </Heading>
                      </HStack>
                      <Text size={"sm"} textAlign="center">
                        {t("event.youthDescription")}
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
                {t("event.locationAndDate")}
              </Heading>
              <SkeletonLoader<EventInfo> data={eventInfo}>
                {(data) => <EventLocations event={data} />}
              </SkeletonLoader>
            </VStack>
          </>
        )}
      ></SectionList>
    </>
  );
};

export default withWatermarkBg(EventScreen);
