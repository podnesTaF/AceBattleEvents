import React from 'react';
import MaterialTopTabs from "@Components/common/navigators/MaterialTopTabs";
import {useTranslation} from "react-i18next";
import {Stack, useLocalSearchParams} from "expo-router";
import {useTranslatedTabs} from "@lib/common/hooks";
import {useGetFullRaceQuery} from "@lib/races/services/raceService";
import {SafeAreaView} from "react-native";
import {formatDate, getPaddingForPlatform} from "@lib/common/utils";
import {Box, Heading, Text, VStack} from "@gluestack-ui/themed";
import CustomBackButton from "@Components/custom/CustomBackButton";
import {getBattleName} from "@lib/races/utils";
import Tabs from "@Components/common/Tabs";

const Layout = () => {
    const {raceId} = useLocalSearchParams();

    const tabs = useTranslatedTabs([
        "event.overview",
        "event.mileRunners",
        "Pacer-Joker",
    ]);
    const {data: race, isLoading, error} = useGetFullRaceQuery(+raceId);

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#1C1E1F",
                    },
                    headerShown: true,
                    headerTintColor: "#fff",
                    header: ({navigation}) => (
                        <SafeAreaView
                            style={{
                                backgroundColor: "#1C1E1F",
                                paddingTop: getPaddingForPlatform(),
                            }}
                        >
                            <VStack space={"md"} alignItems="center" w={"$full"}>
                                <Box position="absolute" left={16} top={16}>
                                    <CustomBackButton navigation={navigation}/>
                                </Box>
                                <VStack alignItems="center" space="md" mb={"$4"}>
                                    <Heading size="xs" color={"#fff"}>
                                        {race?.event.title || "loading"}
                                    </Heading>
                                    <Heading size="lg" color={"#fff"}>
                                        {race ? getBattleName(race) : "Loading"}
                                    </Heading>
                                    <Text color={"#fff"}>{formatDate(race?.startTime)}</Text>
                                </VStack>
                            </VStack>
                        </SafeAreaView>
                    ),
                }}
            />
            <MaterialTopTabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#1C1E1F",
                    },
                    tabBarActiveTintColor: "#fff",
                    tabBarIndicatorStyle: {
                        backgroundColor: "#fff",
                        height: 3,
                        borderRadius: 10
                    },
                    tabBarPressColor: "#1c1e1f",
                    tabBarBounces: true,
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        textTransform: "capitalize",
                    }
                }}
            >
                <MaterialTopTabs.Screen
                    name={'index'}
                    initialParams={{
                        raceId
                    }}
                    options={{
                        title: tabs[0]
                    }}
                />
                <MaterialTopTabs.Screen
                    name={'runners'}
                    initialParams={{
                        raceId
                    }}
                    options={{
                        title: tabs[1]
                    }}
                />
                <MaterialTopTabs.Screen
                    name={'pacer-joker'}
                    initialParams={{
                        raceId
                    }}
                    options={{
                        title: tabs[2]
                    }}
                />
            </MaterialTopTabs>
        </>
    );
};

export default Layout;