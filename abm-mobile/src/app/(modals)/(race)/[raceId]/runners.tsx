import React from 'react';
import ExpandableTable from "@Components/custom/tables/ExpandableTable";
import {useLocalSearchParams} from "expo-router";
import {useGetFullRaceQuery} from "@lib/races/services/raceService";
import {IRace} from "@lib/races/models";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import {getFullDistanceAthletes, getRunnerResultsRows} from "@lib/races/utils";
import {isPassed} from "@lib/common/utils";
import Container from "@Components/common/Container";
import {Box, Heading, HStack, Icon, Text, VStack} from "@gluestack-ui/themed";
import {InfoIcon} from "lucide-react-native";
import {ScrollView} from "react-native";
import {useTranslation} from "react-i18next";

const Milers = () => {
    const {t} = useTranslation();
    const {raceId} = useLocalSearchParams();
    const {data: race, isLoading, error} = useGetFullRaceQuery(+raceId);
    return (
        <SkeletonLoader<IRace>
            error={error}
            height={400}
            isLoading={isLoading}
            data={race}
        >
            {(data) => (
                isPassed(data.startTime) ? (
                    <ScrollView>
                        <ExpandableTable rows={getRunnerResultsRows(getFullDistanceAthletes(race))}/>
                    </ScrollView>
                ) : (
                    <Box my={"$4"}>
                        <Container vertical>
                            <VStack py={"$3"} px={"$2"} space="md">
                                <Heading>Results are not ready</Heading>
                                <HStack space="md" alignItems="center">
                                    <Icon as={InfoIcon} size="lg"/>
                                    <Text>
                                        The race is in process.Wait until the race will be
                                        finished
                                    </Text>
                                </HStack>
                            </VStack>
                        </Container>
                    </Box>
                )
            )}
        </SkeletonLoader>
    );
};

export default Milers;