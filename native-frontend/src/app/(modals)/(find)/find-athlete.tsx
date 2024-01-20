import SearchBar from "@Components/common/SearchBar";
import ImageLoader from "@Components/common/states/ImageLoader";
import NoResourceFound from "@Components/common/states/NoResourceFound";
import UserCard from "@Components/user/UserCard";
import {
  Box,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useAppSelector, useDebounce, useScreenSize } from "@lib/hooks";
import { useGetRunnerPreviewsQuery } from "@lib/services";
import { selectUser } from "@lib/store";
import { scaleSize } from "@lib/utils";
import { Stack, useNavigation } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, SafeAreaView } from "react-native";

const FindAthelteModal = () => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const { isSmallScreen } = useScreenSize();
  const [query, setQuery] = useState("");
  const [debouncedQuery, isDebouncing] = useDebounce(query, 500);
  const user = useAppSelector(selectUser);
  const {
    data: runnersData,
    error,
    isLoading: isRunnersLoading,
    isFetching,
  } = useGetRunnerPreviewsQuery({
    type: "search",
    query: debouncedQuery,
    limit: 20,
    authId: user?.id,
  });
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack mt={"$4"} width={width} alignItems="center">
                <Heading size="sm" color="$coolGray200">
                  {t("search.findAthlete")}
                </Heading>
                <Box w={"$full"} flex={1}>
                  <SearchBar
                    variant="dark"
                    placeholder={t("search.searchByNameOrSurname")}
                    value={query}
                    onChange={(text) => setQuery(text)}
                  />
                </Box>
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <Box flex={1} bg={"$coolGray100"}>
        {query.length ? (
          <ImageLoader
            isLoading={isRunnersLoading || isFetching || isDebouncing}
            error={error}
          >
            <ScrollView
              p={"$4"}
              mt={isSmallScreen ? "$6" : "$2"}
              height={"$full"}
            >
              <Box mb={"$4"}>
                <Heading>{t("common.runners")}</Heading>
                <VStack>
                  {runnersData?.runners?.length ? (
                    runnersData?.runners?.map((runner, i) => (
                      <UserCard
                        key={runner.id}
                        user={runner.user}
                        runnerPreview={runner}
                        isAuthorized={!!user}
                      />
                    ))
                  ) : (
                    <NoResourceFound
                      title={t("search.noRunnersFound")}
                      text={t("search.pleaseEditFilters")}
                    />
                  )}
                </VStack>
              </Box>
            </ScrollView>
          </ImageLoader>
        ) : (
          <Center flex={1}>
            <Image
              source={require("@Assets/images/runners.png")}
              style={{
                width: 80,
                height: 100,
                objectFit: "contain",
              }}
              role={"img"}
              alt={"loading..."}
            />
            <Heading size="lg" color="$coolGray500">
              {t("search.lookForAthleteOrTeam")}
            </Heading>
            <Text maxWidth={scaleSize(300)} textAlign="center">
              {t("search.searchForAthleteOrTeam")}
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
};

export default FindAthelteModal;
