import withWatermarkBg from "@Components/HOCs/withWatermark";
import AuthCallToAction from "@Components/auth/AuthCallToAction";
import Tabs from "@Components/common/Tabs";
import NotificationsScreen from "@Components/notifications/NotificationsScreen";
import SendMessageForm from "@Components/notifications/SendMessageForm";
import { Box, ScrollView, VStack } from "@gluestack-ui/themed";
import { useAppSelector } from "@lib/hooks";
import { selectUser } from "@lib/store";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Dimensions, FlatList } from "react-native";

const Notifications = () => {
  const user = useAppSelector(selectUser);
  const [tabs, setTabs] = React.useState<string[]>(["Your Notifications"]);
  const [data, setData] = React.useState<any[]>([<NotificationsScreen />]);
  const [activeTab, setActiveTab] = React.useState(0);

  const flatListRef = useRef<FlatList>(null);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    if (user?.role === "manager") {
      setTabs((prev) => prev.concat("Send Message"));
      setData((prev) => prev.concat([<SendMessageForm />]));
    }
  }, [user]);

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ animated: true, index: activeTab });
  }, [activeTab]);

  if (!user) {
    return (
      <VStack my={"$6"} flex={1}>
        <AuthCallToAction screen={"notification"} />
      </VStack>
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
                items={tabs}
                onChangeTab={onChangeTab}
              />
            </Box>
          ),
        }}
      />
      <FlatList
        ref={flatListRef}
        data={data}
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
