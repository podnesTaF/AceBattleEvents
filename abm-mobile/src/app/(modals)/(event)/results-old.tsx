import WithLoading from "@Components/HOCs/withLoading";
import withWatermarkBg from "@Components/HOCs/withWatermark";
import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import Tabs from "@Components/common/Tabs";
import RaceCard from "@Components/race/RaceCard";
import RaceOverview from "@Components/race/RaceOverview";
import {
  Box,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useFetchEventResultsQuery } from "@lib/events/services";
import { useTranslatedTabs } from "@lib/hooks";
import { EventResult, RaceShortForm } from "@lib/models";
import { getPaddingForPlatform } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import { TFunction } from "i18next";
import { InfoIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, SafeAreaView } from "react-native";

const tabsData = (
  eventResult: EventResult,
  t: TFunction<"translation", undefined>
) => {
  return [
    <RaceOverview eventResult={eventResult} />,
    <Box py={"$4"}>
      <Heading mx={"$4"} size="lg" mb={"$2"}>
        {t("event.races")}
      </Heading>
      <Container borderSize={2}>
        {Object.keys(eventResult.racesByType).map((type, i) => (
          <VStack key={i}>
            {(eventResult.racesByType as any)[type].map(
              (race: RaceShortForm) => (
                <RaceCard key={race.id} race={race} />
              )
            )}
          </VStack>
        ))}
      </Container>
    </Box>,
  ];
};

const ResultsOld = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const { width } = Dimensions.get("window");
  const { eventId } = useLocalSearchParams();
  const tabs = useTranslatedTabs(["event.overview", "event.byRace"]);

  const {
    data: eventResult,
    error: eventResultError,
    isLoading: eventResultLoading,
  } = useFetchEventResultsQuery(+eventId);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ animated: true, index: activeTab });
  }, [activeTab]);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
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
          header: () => (
            <SafeAreaView
              style={{
                backgroundColor: "#1C1E1F",
                paddingTop: getPaddingForPlatform(),
              }}
            >
              <VStack space={"md"} alignItems="center" w={"$full"}>
                <HeaderSubtitledTitle
                  subtitle={eventResult?.eventTitle || ""}
                  title={t("common.results")}
                  tintColor={"#fff"}
                />
                <Tabs
                  items={tabs}
                  activeColor={"#ff0000"}
                  onChangeTab={onChangeTab}
                  activeIndex={activeTab}
                />
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <WithLoading isLoading={eventResultLoading}>
        {!eventResult?.notFinished ? (
          eventResult && (
            <ScrollView>
              <FlatList
                ref={flatListRef}
                data={tabsData(eventResult, t)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                renderItem={({ item }) => <Box width={width}>{item}</Box>}
                keyExtractor={(item, i) => i.toString()}
                scrollEnabled={false}
              />
            </ScrollView>
          )
        ) : (
          <Box flex={1} py={"$6"}>
            <Container>
              <Box py={"$4"} pr={"$4"} minHeight={"$24"}>
                <HStack space="sm" alignItems="center">
                  <Icon as={InfoIcon} size="lg" />
                  <Text>{t("event.overviewNotReady")}</Text>
                </HStack>
              </Box>
            </Container>
          </Box>
        )}
      </WithLoading>
    </>
  );
};

export default withWatermarkBg(ResultsOld, "#fff9ff");
