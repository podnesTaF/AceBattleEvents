import MilerCard from "@Components/athletes/MilerCard";
import PairCard from "@Components/athletes/PairCard";
import ResultPodium from "@Components/events/ResultPodium";
import {Box, Heading, HStack, Icon, Text, VStack} from "@gluestack-ui/themed";
import {EventResult} from "@lib/models";
import React from "react";
import {useTranslation} from "react-i18next";
import {useLocalSearchParams} from "expo-router";
import {useFetchEventResultsQuery} from "@lib/events/services";
import Container from "@Components/common/Container";
import {InfoIcon} from "lucide-react-native";
import WithLoading from "@Components/HOCs/withLoading";
import {ScrollView} from "react-native";

const RaceOverview = () => {
    const {t} = useTranslation();
    const {eventId} = useLocalSearchParams();

    const {
        data: eventResult,
        error: eventResultError,
        isLoading: eventResultLoading,
    } = useFetchEventResultsQuery(+eventId);
    return (
        <ScrollView>
            <WithLoading isLoading={eventResultLoading}>
                {!eventResult?.notFinished ? (
                    eventResult && (
                        <>
                            <Box my={"$4"}>
                                <Heading size={"xl"} mx={"$4"}>
                                    {t("common.winners")}
                                </Heading>
                                <VStack
                                    space="md"
                                    bg={"#1E1C1F"}
                                    alignItems="center"
                                    px={"$6"}
                                    py={"$4"}
                                >
                                    <ResultPodium podium={eventResult.podium} gender={"male"}/>
                                    <ResultPodium podium={eventResult.podium} gender={"female"}/>
                                </VStack>
                            </Box>
                            <VStack px={"$3"} my="$4" space="md">
                                <Heading size={"lg"}>{t("event.bestMile")}</Heading>
                                {Object.keys(eventResult.bestSportsmen).map((item: any) => (
                                    <MilerCard
                                        key={item}
                                        resultInMs={eventResult.bestSportsmen[item]!.finalResultInMs}
                                        runner={eventResult.bestSportsmen[item].runner}
                                    />
                                ))}
                            </VStack>
                            <VStack space="lg">
                                {Object.keys(eventResult.bestJokerPair).map((category) => (
                                    <PairCard
                                        key={category}
                                        runnerResults={(eventResult.bestJokerPair as any)[category].runners}
                                        finalResultInMs={
                                            (eventResult.bestJokerPair as any)[category].finalResultInMs
                                        }
                                        category={category}
                                    />
                                ))}
                            </VStack>
                        </>
                    )
                ) : (
                    <Box flex={1} py={"$6"}>
                        <Container>
                            <Box py={"$4"} pr={"$4"} minHeight={"$24"}>
                                <HStack space="sm" alignItems="center">
                                    <Icon as={InfoIcon} size="lg"/>
                                    <Text>{t("event.overviewNotReady")}</Text>
                                </HStack>
                            </Box>
                        </Container>
                    </Box>
                )}
            </WithLoading>
        </ScrollView>
    );
};

export default RaceOverview;
