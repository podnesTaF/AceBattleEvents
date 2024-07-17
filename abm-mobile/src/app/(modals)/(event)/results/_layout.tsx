import React from 'react';
import MaterialTopTabs from "@Components/common/navigators/MaterialTopTabs";
import {useTranslation} from "react-i18next";
import {useLocalSearchParams} from "expo-router";
import {useTranslatedTabs} from "@lib/common/hooks";

const Layout = () => {
    const { t } = useTranslation();
    const { eventId, name } = useLocalSearchParams<{
        eventId?: string;
        name?: string;
    }>();

    const tabs = useTranslatedTabs(["event.overview", "event.byRace"]);


    return (
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
                tabBarGap: 6,
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
                    eventId
                }}
                options={{
                    title: tabs[0]
                }}
            />
            <MaterialTopTabs.Screen
                name={'schedule'}
                initialParams={{
                    eventId
                }}
                options={{
                    title: tabs[1]
                }}
            />
        </MaterialTopTabs>
    );
};

export default Layout;