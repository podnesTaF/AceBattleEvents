import withWatermarkBg from "@Components/HOCs/withWatermark";
import AuthCallToAction from "@Components/auth/AuthCallToAction";
import Tabs from "@Components/common/Tabs";
import NotificationsScreen from "@Components/notifications/NotificationsScreen";
import SentNotifications from "@Components/notifications/SentNotifications";
import { Box, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { getNotificationTabs } from "@lib/utils";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList } from "react-native";

const getNotificationsScreens = (role?: string): JSX.Element[] => {
  const elements = [<NotificationsScreen />];

  if (role === "manager") {
    elements.push(<SentNotifications />);
  }

  return elements;
};

const Notifications = () => {
  const user = useAppSelector(selectUser);
  const [activeTab, setActiveTab] = React.useState(0);

  const flatListRef = useRef<FlatList>(null);
  const width = Dimensions.get("window").width;
  const { t } = useTranslation();

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ animated: true, index: activeTab });
  }, [activeTab]);

  if (!user) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <VStack my={"$6"} flex={1}>
          <AuthCallToAction screen={"notification"} />
        </VStack>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Box pt={"$2"} w={width} bg={"#1C1E1F"}>
              <Tabs
                activeColor={"#ff0000"}
                activeIndex={activeTab}
                items={getNotificationTabs(t, user?.role)}
                onChangeTab={onChangeTab}
              />
            </Box>
          ),
        }}
      />
      <FlatList
        ref={flatListRef}
        data={getNotificationsScreens(user?.role)}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        renderItem={({ item }) => (
          <Box w={width}>
            <ScrollView>{item}</ScrollView>
          </Box>
        )}
      />
    </>
  );
};

export default withWatermarkBg(Notifications);
