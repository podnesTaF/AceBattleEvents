import React from 'react';
import {Box, Heading, HStack, Icon, Text, VStack} from "@gluestack-ui/themed";
import Container from "@Components/common/Container";
import {RaceShortForm} from "@lib/races/models";
import RaceCard from "@Components/race/RaceCard";
import {useFetchEventResultsQuery} from "@lib/events/services";
import {useLocalSearchParams} from "expo-router";
import {useTranslation} from "react-i18next";
import {InfoIcon} from "lucide-react-native";
import WithLoading from "@Components/HOCs/withLoading";

const Schedule = () => {
    const {t} = useTranslation();
    const {eventId} = useLocalSearchParams();
    const {
        data: eventResult,
        error: eventResultError,
        isLoading: eventResultLoading,
    } = useFetchEventResultsQuery(+eventId);

    return (
        <WithLoading isLoading={eventResultLoading}>
            {!eventResult?.notFinished ? (
                eventResult && (
                    <Box py={"$4"}>
                        <Heading mx={"$4"} size="lg" mb={"$2"}>
                            {t("event.races")}
                        </Heading>
                        <Container borderSize={2}>
                            {Object.keys(eventResult.racesByType).map((type, i) => (
                                <VStack key={i}>
                                    {(eventResult.racesByType as any)[type].map(
                                        (race: RaceShortForm) => (
                                            <RaceCard key={race.id} race={race}/>
                                        )
                                    )}
                                </VStack>
                            ))}
                        </Container>
                    </Box>)
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
    );
};

export default Schedule;