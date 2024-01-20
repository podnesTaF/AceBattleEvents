import withWatermarkBg from "@Components/HOCs/withWatermark";
import SearchBar from "@Components/common/SearchBar";
import ImageLoader from "@Components/common/states/ImageLoader";
import NoResourceFound from "@Components/common/states/NoResourceFound";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import EventCard from "@Components/events/EventCard";
import {
  Box,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetAllEventsQuery } from "@lib/events/services";
import { useScreenSize } from "@lib/hooks";
import { IEvent } from "@lib/models";
import { scaleSize } from "@lib/utils";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, SafeAreaView } from "react-native";

const FindEventModal = () => {
  const [query, setQuery] = useState("");
  const {
    data: pastEvents,
    isLoading: isLoadingPastEvents,
    isFetching: isFetchingPastEvents,
    error: errorPastEvents,
  } = useGetAllEventsQuery(`finished=true&name=${query}`);
  const {
    data: futureEvents,
    isLoading: isLoadingFutureEvents,
    isFetching: isFetchingFutureEvents,
    error: errorFutureEvents,
  } = useGetAllEventsQuery(`name=${query}`);

  const { isSmallScreen } = useScreenSize();
  const { t } = useTranslation();

  const width = Dimensions.get("window").width;

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack mt={"$4"} width={width} alignItems="center">
                <Heading size="sm" color="$coolGray200">
                  {t("search.findEvent")}
                </Heading>
                <Box w={"$full"}>
                  <SearchBar
                    variant="dark"
                    placeholder={t("search.searchForAnEvent")}
                    value={query}
                    onChange={(text) => setQuery(text)}
                  />
                </Box>
              </VStack>
            </SafeAreaView>
          ),
        }}
      />

      {query ? (
        <ImageLoader
          isLoading={
            isLoadingPastEvents ||
            isLoadingFutureEvents ||
            isFetchingPastEvents ||
            isFetchingFutureEvents
          }
          error={errorPastEvents || errorFutureEvents}
        >
          <ScrollView>
            <VStack p={"$4"} mt={isSmallScreen ? "$6" : "$2"} space={"md"}>
              {["upcoming", "past"].map((title, index) => (
                <VStack key={index} space={"md"} alignItems="center">
                  <Heading size="md" color="$coolGray500">
                    {t("common." + title)}
                  </Heading>
                  <SkeletonLoader<IEvent[]>
                    data={
                      title === "upcoming"
                        ? futureEvents?.events
                        : pastEvents?.events
                    }
                    isLoading={false}
                  >
                    {(data) => (
                      <VStack w={"$full"} space="md">
                        {data.length ? (
                          data.map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))
                        ) : (
                          <NoResourceFound
                            title={t("search.noEventFound")}
                            text={t("search.trySearchingForAnotherEvent")}
                          />
                        )}
                      </VStack>
                    )}
                  </SkeletonLoader>
                </VStack>
              ))}
            </VStack>
          </ScrollView>
        </ImageLoader>
      ) : (
        <Center flex={1}>
          <Image
            source={require("@Assets/images/runners.png")}
            style={{
              width: isSmallScreen ? 50 : 80,
              height: isSmallScreen ? 80 : 100,
              objectFit: "contain",
            }}
            role={"img"}
            alt={"loading..."}
          />
          <Heading size="lg" color="$coolGray500">
            {t("search.searchForEventByTitle")}
          </Heading>
          <Text maxWidth={scaleSize(300)} textAlign="center">
            {t("search.youCanSearchForEvent")}
          </Text>
        </Center>
      )}
    </>
  );
};

export default withWatermarkBg(FindEventModal, "#fff9ff");
