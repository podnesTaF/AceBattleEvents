import SearchTitle from "@Components/common/SearchTitle";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          title: "Ace Battle Mile",
          headerTitle: (props) => (
            <SearchTitle
              link={"/(modals)/(find)/find-athlete"}
              placeholder={t("search.searchForAnAthlete")}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
