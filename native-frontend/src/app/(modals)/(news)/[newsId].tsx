import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import { Heading, ScrollView } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";

const ArticlePage = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <HeaderSubtitledTitle title={"News"} tintColor={tintColor} />
          ),
        }}
      />
      <ScrollView>
        <Heading>Article page</Heading>
      </ScrollView>
    </>
  );
};

export default ArticlePage;
