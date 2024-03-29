import withWatermarkBg from "@Components/HOCs/withWatermark";
import LogoTitle from "@Components/LogoTitle";
import FollowingAthletesList from "@Components/athletes/FollowingAthletesList";
import HorizontalListLayout from "@Components/common/HorizontalListLayout";
import InfoTemplate from "@Components/common/InfoTemplate";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { Box, HStack, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import { ITeam } from "@lib/models";
import { useGetFollowingTeamsQuery } from "@lib/services";
import { getPaddingForPlatform, scaleSize } from "@lib/utils";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

const Followings = () => {
  const { data: teams, isLoading, error } = useGetFollowingTeamsQuery();
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "#fff",
          header: (props) => (
            <SafeAreaView
              style={{
                backgroundColor: "#1C1E1F",
                paddingTop: getPaddingForPlatform(),
              }}
            >
              <VStack alignItems="center" width={"100%"} py={"$1"} space="md">
                <LogoTitle {...props} />
                <Heading size="sm" color="$coolGray200">
                  {t("common.followings")}
                </Heading>
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <ScrollView bg={"$fff9ff"}>
        <VStack my={"$4"} space="sm">
          <HStack mx={"$4"}>
            <Heading size="lg" color="$red500">
              {t("common.teams")}
            </Heading>
          </HStack>
          <SkeletonLoader<ITeam[]>
            data={teams}
            isLoading={isLoading}
            error={error}
          >
            {(data) =>
              data.length > 0 ? (
                <HorizontalListLayout
                  identifier="team"
                  items={data}
                  ItemComponent={TeamPreviewCard}
                  additionalProps={{
                    Item: TeamPreview,
                    imageProportion: 2,
                    minWidth: scaleSize(320),
                  }}
                />
              ) : (
                <Box px={"$4"}>
                  <InfoTemplate
                    variant="outline"
                    title={t("infoTemplate.noFollowingsTitle")}
                    text={t("infoTemplate.noFollowingsText")}
                  />
                </Box>
              )
            }
          </SkeletonLoader>
        </VStack>
        <VStack mt={"$4"} mb={"$8"} space="sm">
          <HStack mx={"$4"}>
            <Heading size="lg">{t("common.runners")}</Heading>
          </HStack>
          <FollowingAthletesList />
        </VStack>
      </ScrollView>
    </>
  );
};

export default withWatermarkBg(Followings);
